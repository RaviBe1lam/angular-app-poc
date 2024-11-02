import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType, EffectsModule,} from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import {ChangePasswordActionTypes, Changepassword, ChangepasswordSuccess, ChangepasswordFailure} from '../../store/actions/changepassword.actions';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { ChangepasswordComponent } from '../../components/changepassword/changepassword.component';

@Injectable()
export class ChangepasswordEffects {

  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  @Effect()
  Changepassword : Observable<any> = this.actions.pipe(
    ofType(ChangePasswordActionTypes.CHANGEPASSWORD),
    map((action : Changepassword) => action.payload),
    switchMap((payload) =>{
      return this.userService.changePassword(payload).pipe(
        map((data) =>{
          if(data.message === "User Password successfully")
          {
         return new ChangepasswordSuccess(data.message)
         }
         else if (data.message === "User Password Failed")
          {
          return new ChangepasswordFailure(data)
         }
         
          })
      );
    })
  );

  @Effect({dispatch: false})
  ChangepasswordSuccess : Observable<any> = this.actions.pipe(
    ofType(ChangePasswordActionTypes.CHANGEPASSWORD_SUCCESS),
    tap((data) =>{
      // console.log("Change Password success: "+data);
    })
  );

  @Effect({dispatch: false})
  ChangepasswordFailure : Observable<any> = this.actions.pipe(
    ofType(ChangePasswordActionTypes.CHANGEPASSWORD_FAILURE),
    tap((data) =>{
      // console.log("Change Password failed: "+data);
    })
  );
  
}