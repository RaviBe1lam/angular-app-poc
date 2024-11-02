import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, EffectsModule} from "@ngrx/effects";
import { Observable } from "rxjs";
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {SignupActionTypes, Signup, SignupSuccess, SignupEmailFailure, SignupUsernameFailure, SignupFailure} from '../../store/actions/signup.actions';

@Injectable()
export class SignupEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService
  ) {}

  @Effect()
  Signup : Observable<any> = this.actions.pipe(
    ofType(SignupActionTypes.SIGNUP),
    map((action : Signup) => action.payload),
    switchMap((payload) =>{
      return this.authService.register(payload).pipe(
        map((data) =>{
          console.log("data: "+data.message);
          if(data.message === "User registered successfully")
          {
          return new SignupSuccess(data.message)
          }
          else if (data.message === "Username already exists")
          {
          return new SignupUsernameFailure(data)
          }
          else if(data.message ==="Email Id already exists")
          {
          return new SignupEmailFailure(data)
          }
          else{
            return new SignupFailure(data);
          }
          })
      );
    })
  );

  @Effect({dispatch: false})
  SignupSuccess : Observable<any> = this.actions.pipe(
    ofType(SignupActionTypes.SIGNUP_SUCCESS),
    tap((data) =>{
      console.log("Signup success: "+data);
    })
  );

  @Effect({dispatch: false})
  SignupUsernameFailure : Observable<any> = this.actions.pipe(
    ofType(SignupActionTypes.SIGNUP_USERNAME_FAILURE),
    tap((data) =>{
      console.log("Signup Username failed: "+data);
    })
  );

  @Effect({dispatch: false})
  SignupEmailFailure : Observable<any> = this.actions.pipe(
    ofType(SignupActionTypes.SIGNUP_EMAIL_FAILURE),
    tap((data) =>{
      console.log("Signup Email failed: "+data);
    })
  );

  @Effect({dispatch: false})
  SignupFailure : Observable<any> = this.actions.pipe(
    ofType(SignupActionTypes.SIGNUP_FAILURE),
    tap((data) =>{
      console.log("Signup failed: "+data);
    })
  );

  
}