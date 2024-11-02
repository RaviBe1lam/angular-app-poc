import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../components/users/user';
import { catchError, tap, map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

const apiUrl = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  isLoggedIn = false;
  redirectUrl : String;
  userName: String;
  userType: String;
  token: String;
  errorMessage: String;
  envalue : String;
  constructor(private http : HttpClient) {}

  deleteTokenUser(userName : String) : Observable<any>{
    return this.http.delete<any>(apiUrl + 'tokenDelete/'+userName)
    .pipe(
      tap(_ => this.log("Token Deleted"))
    );
  }

  refreshTokenUser(userName : String) : Observable<any>{
    return this.http.get<any>('http://localhost:8080/api/getToken/'+userName)
    .pipe(
      tap(_ => this.log("Token Refreshed"))
    );
  }

  login(data: any): Observable<any> {
    localStorage.clear();
    return this.http.post<any>(apiUrl + 'login', data)
    .pipe(
      map((d) => {
        if(d.message==="Login Successful")
        {
          // console.log("user token: "+d.token);      
      this.envalue = CryptoJS.AES.encrypt(JSON.stringify(d.token), 'admin').toString();
      // console.log("encrypted: "+this.envalue);
      localStorage.setItem('value',this.envalue.toString());  
          this.isLoggedIn = true;
          this.userName = d.username;
          this.userType = d.role;
          this.token = d.token;
          return d;
        }
        else{
          this.errorMessage = "Invalid Credentials";
          return d;
        }
      })
      )
  }

  userExists(data : String) : Observable<any>{
    return this.http.get<User>(apiUrl + 'userExists/'+data)
    .pipe(
      tap(_ => this.log('UserName Checked')
      ),
      catchError(this.handleError('login',[]))
    );

  }



  emailExists(data : String) : Observable<any>{
    return this.http.get<User>(apiUrl + 'emailExists/'+data)
    .pipe(
      tap(_ => this.log('email Checked')
      ),
      catchError(this.handleError('login',[]))
    );

  }

  register(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'register', data)
      .pipe(
        tap(_ => this.log('Register Service')),
        catchError(this.handleError('register', []))
      );
  }

  forgotpassword (data: any): Observable<any> {
    return this.http.post <any>(apiUrl + 'forgotpassword', data)
      .pipe(
        tap(_ => this.log('forgotpassword Service')),
        catchError(this.handleError('forgotpassword', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}
