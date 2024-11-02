import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType, EffectsModule,} from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {AuthActionTypes, Login, LoginSuccess, LoginFailure} from '../../store/actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

 @Effect()
 Login : Observable<Action> = this.actions.pipe(
  ofType(AuthActionTypes.LOGIN),
  map((action : Login) => action.payload),
  switchMap((payload) => {
    return this.authService.login(payload).pipe(
      map((data) => {
        if(data.message === "Login Successful")
        return new LoginSuccess({token : data.token, userName : data.username, userType : data.role})
        else if(data.message === "Invalid Credentials")
        {
          return new LoginFailure(data);
        }
      })
      )
  })
 );

 @Effect({ dispatch: false })
  LoginSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      
      this.router.navigate(['products']);
    })
  );

  @Effect({ dispatch: false })
  LoginFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap((data) =>{
      this.router.navigate(['']);
    })
  );
 
}