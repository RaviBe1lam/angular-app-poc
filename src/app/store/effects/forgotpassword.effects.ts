import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType, EffectsModule,} from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {ForgotPasswordActionTypes, Forgotpassword, ForgotpasswordSuccess, ForgotpasswordFailure} from '../../store/actions/forgotpassword.actions';

@Injectable()
export class ForgotpasswordEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  Forgotpassword : Observable<any> = this.actions.pipe(
    ofType(ForgotPasswordActionTypes.FORGOTPASSWORD),
    map((action : Forgotpassword) => action.payload),
    switchMap((payload) =>{
      return this.authService.forgotpassword(payload).pipe(
        map((data) =>{
          if(data.message === "Password Reset Successful")
          {
         return new ForgotpasswordSuccess(data.message)
         }
         else if (data.message === "Invalid Username/Password")
          {
          return new ForgotpasswordFailure(data)
         }
         
          })
      );
    })
  );

  @Effect({dispatch: false})
  ForgotpasswordSuccess : Observable<any> = this.actions.pipe(
    ofType(ForgotPasswordActionTypes.FORGOTPASSWORD_SUCCESS),
    tap((data) =>{
      // console.log("Forgot Password success: "+data);
    })
  );

  @Effect({dispatch: false})
  ForgotpasswordFailure : Observable<any> = this.actions.pipe(
    ofType(ForgotPasswordActionTypes.FORGOTPASSWORD_FAILURE),
    tap((data) =>{
      // console.log("Forgot Password failed: "+data);
    })
  );
  
}