import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, EffectsModule} from "@ngrx/effects";
import { Observable } from "rxjs";
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import {UserseditActionTypes, Usersedit, UserseditSuccess, UserseditFailure, UserseditEmailFailure } from '../../store/actions/usersedit.actions';
import { Router } from '@angular/router';

@Injectable()
export class UserseditEffects {

  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  @Effect()
  Usersedit : Observable<any> = this.actions.pipe(
    ofType(UserseditActionTypes.USERSEDIT),
    map((action : Usersedit) => action.payload),
    switchMap((payload) =>{
      console.log("Users EDIT: "+payload);
      return this.userService.editUser(payload).pipe(
        map((data) =>{
          console.log("data: "+data.message);
          if(data.message === "User Edited successfully")
          {
            console.log("User Edit success");
          return new UserseditSuccess(data)
          }
          else if (data.message === "Email Id Exists")
          {
            console.log("Email Id Exists");
          return new UserseditEmailFailure(data);
          }
          else if(data.message == "User Edit Failed")
          {
              console.log("User Edit Failed");
              return new UserseditFailure(data);
          }
        })
      );
    })
  );

  @Effect({dispatch: false})
  UserseditSuccess : Observable<any> = this.actions.pipe(
    ofType(UserseditActionTypes.USERSEDIT_SUCCESS),
    tap((data) =>{
        this.router.navigate(['users']);
      console.log("User Edited: "+data);
    })
  );

  @Effect({dispatch: false})
  UserseditFailure : Observable<any> = this.actions.pipe(
    ofType(UserseditActionTypes.USERSEDIT_FAILURE),
    tap((data) =>{
      console.log("Users Edit Failed: "+data);
    })
  );

  @Effect({dispatch: false})
  UserseditEmailFailure : Observable<any> = this.actions.pipe(
    ofType(UserseditActionTypes.USERSEDIT_EMAIL_FAILURE),
    tap((data) =>{
      console.log("Email already exists: "+data);
    })
  );


}