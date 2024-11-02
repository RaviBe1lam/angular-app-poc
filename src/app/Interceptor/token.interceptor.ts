import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as CryptoJS from 'crypto-js';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();
import * as jwt_decode from "jwt-decode";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
errorMessage: String;
token: null | string;
date : number;
currentTime: number;
expiryTime: number;
diffTime: number;
username: String;
envalue: string;
i=0;
constructor(private router: Router, private authService: AuthService) {}
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if(localStorage.getItem('value'))
  {
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('value'),'admin');
  if (bytes.toString()) {
  this.token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  this.username = jwt_decode(this.token).user_name;
     localStorage.removeItem('value');
     this.authService.refreshTokenUser(this.username).subscribe(
       (data) => {console.log("Refreshed")
       this.envalue = CryptoJS.AES.encrypt(JSON.stringify(data.accessToken), 'admin').toString();
      //  console.log("Token Before Expiry: "+this.token);
      //  console.log("Token After Expiry: "+data.accessToken);
       localStorage.setItem('value',this.envalue);
     }
     );
  
}


    if (this.token) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + this.token
        }
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 401) {
          this.errorMessage = "Invalid-Credentials";
          this.router.navigate(['login',this.errorMessage]);
        }
        if (error.status === 400) {
          alert(error.error);
        }
        return throwError(error);
      }));
  }
  
}
