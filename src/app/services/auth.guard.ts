import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AuthService} from './auth.service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token : String | null;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    if(localStorage.getItem('value'))
  {
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('value'),'admin');
  if (bytes.toString()) {
  this.token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  return true; 
}
    else{
      this.router.navigate(['']);
     return false;
    }

  }
  
}
