import { Injectable } from '@angular/core';
import { User } from '../components/users/user';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
 
const apiUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private router : Router) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(apiUrl + '/users')
      .pipe(
        tap(_ => this.log('fetched Users')),
        catchError(this.handleError('/users/getUsers', []))
      ); 
  }

  getUserFilter(userName : any, page: any) : Observable<User[]>{
    page = page-1;
    return this.http.get<User[]>(apiUrl + '/users/findUserName/' +userName+ '/' + page)
    .pipe(
      tap(_ => this.log('fetched Filtered users')),
      catchError(this.handleError('getfilteredUsers()',[]))
    );
  }

  getDeletedUserFilter(userName : any, page: any) : Observable<User[]>{
    page = page-1;
    return this.http.get<User[]>(apiUrl + '/users/findDeletedUserName/' +userName+ '/' + page)
    .pipe(
      tap(_ => this.log('fetched DeletedFiltered users')),
      catchError(this.handleError('getfilteredUsers()',[]))
    );
  }

  getPage(page: any) : Observable<User[]>{
    page=page-1;
    return this.http.get<User[]>(apiUrl + '/users/pageusers/'+ page)
    .pipe(
      tap(
        _ => this.log('fetched page user')),
        catchError(this.handleError('getPage',[]))
    );
  }

  getDeletedPage(page: any) : Observable<User[]>{
    page=page-1;
    return this.http.get<User[]>(apiUrl + '/users/deletedPageusers/'+ page)
    .pipe(
      tap(
        _ => this.log('fetched page user')),
        catchError(this.handleError('getPage',[]))
    );
  }

  getdeletedUsers(): Observable<User[]> {
    return this.http.get<User[]>(apiUrl + '/users/deletedusers')
      .pipe(
        tap(_ => this.log('fetched deleted Users')),
        catchError(this.handleError('/users/getdeletedUsers', []))
      ); 
  }

  insertUser(data: any) : Observable<any>{
    return this.http.post<any>(apiUrl + '/users/insertUser', data)
    .pipe(
      tap(_ => this.log('User Inserted')),
      catchError(this.handleError('users/insertUser', []))
    );
  }


  getUser(data: String) : Observable<any>{
    return this.http.get<User>(apiUrl + '/users/getUser/'+ data)
    .pipe(
      tap(_ => this.log('User Retreived')),
      catchError(this.handleError('users', []))
    );
  }

  getUserProfile(data: String) : Observable<any>{
    return this.http.get<User>(apiUrl + '/getUserProfile/'+ data)
    .pipe(
      tap(_ => this.log('User Retreived')),
      catchError(this.handleError('users', []))
    );
  }

  changePassword(data : String) : Observable<any>{
    return this.http.put<String>(apiUrl + '/changePassword', data)
    .pipe(
        tap(_ => this.log('Password Changed')),
        catchError(this.handleError('changepassword',[]))
    );
  }


  deleteUser(data: String) : Observable<any>{
    return this.http.delete<String>(apiUrl + '/users/deleteUser/'+data)
    .pipe(
      tap(_ =>{
        console.log("User is deleted");
   }),
      catchError(this.handleError('users', []))
    );
  }

  editUser(data: any) : Observable<any>{
    return this.http.put<String>(apiUrl + '/users/editUser', data)
    .pipe(
      tap(_ => this.log('User Edited')),
      catchError(this.handleError('users/editUser ', []))
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
