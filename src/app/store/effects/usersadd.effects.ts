import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, EffectsModule} from "@ngrx/effects";
import { Observable } from "rxjs";
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import {UsersaddActionTypes, Usersadd, UsersaddSuccess, UsersaddFailure, UsersaddEmailFailure, UsersaddUsernameFailure } from '../../store/actions/usersadd.actions';
import { Router } from '@angular/router';

@Injectable()
export class UsersaddEffects {

  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  @Effect()
  Usersadd : Observable<any> = this.actions.pipe(
    ofType(UsersaddActionTypes.USERSADD),
    map((action : Usersadd) => action.payload),
    switchMap((payload) =>{
      console.log("Users Insert: "+payload);
      return this.userService.insertUser(payload).pipe(
        map((data) =>{
          console.log("data: "+data.message);
          if(data.message === "User registered successfully")
          {
            console.log("User Inserted success");
          return new UsersaddSuccess(data.message)
          }
          else if (data.message === "Email Id already exists")
          {
            console.log("Email Id Exists");
          return new UsersaddEmailFailure(data.message);
          }
          else if(data.message == "Username already exists")
          {
              console.log("Username Exists");
              return new UsersaddUsernameFailure(data.message);
          }
        })
      );
    })
  );

  @Effect({dispatch: false})
  UsersaddSuccess : Observable<any> = this.actions.pipe(
    ofType(UsersaddActionTypes.USERSADD_SUCCESS),
    tap((data) =>{
        this.router.navigate(['users']);
      console.log("User Inserted: "+data);
    })
  );

  @Effect({dispatch: false})
  UsersaddFailure : Observable<any> = this.actions.pipe(
    ofType(UsersaddActionTypes.USERSADD_FAILURE),
    tap((data) =>{
      console.log("Users did not Insert: "+data);
    })
  );

  @Effect({dispatch: false})
  UsersaddEmailFailure : Observable<any> = this.actions.pipe(
    ofType(UsersaddActionTypes.USERSADD_EMAIL_FAILURE),
    tap((data) =>{
      console.log("Email already exists: "+data);
    })
  );

  @Effect({dispatch: false})
  UsersaddUsernameFailure : Observable<any> = this.actions.pipe(
    ofType(UsersaddActionTypes.USERSADD_USERNAME_FAILURE),
    tap((data) =>{
      console.log("Username already Exists: "+data);
    })
  );

}