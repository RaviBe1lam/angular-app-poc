import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, EffectsModule} from "@ngrx/effects";
import { Observable } from "rxjs";
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import {UsersdeleteActionTypes, Usersdelete, UsersdeleteSuccess, UsersdeleteFailure} from '../../store/actions/usersdelete.actions';
import { Router } from '@angular/router';

@Injectable()
export class UsersdeleteEffects {

  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  @Effect()
  Usersdelete : Observable<any> = this.actions.pipe(
    ofType(UsersdeleteActionTypes.USERSDELETE),
    map((action : Usersdelete) => action.payload),
    switchMap((payload) =>{
      // console.log("Users DELETE: "+payload);
      return this.userService.deleteUser(payload).pipe(
        map((data) =>{
          // console.log("data: "+data.message);
          if(data.message === "User deleted successfully")
          {
            // console.log("User Delete success");
          return new UsersdeleteSuccess(data)
          }
          else if (data.message === "User delete failed")
          {
            // console.log("User delete failed");
          return new UsersdeleteFailure(data);
          }
        })
      );
    })
  );

  @Effect({dispatch: false})
  UsersdeleteSuccess : Observable<any> = this.actions.pipe(
    ofType(UsersdeleteActionTypes.USERSDELETE_SUCCESS),
    tap((data) =>{
      console.log("Navigated to users");
      this.router.navigate(['users']);
    })
  );

  @Effect({dispatch: false})
  UsersedeleteFailure : Observable<any> = this.actions.pipe(
    ofType(UsersdeleteActionTypes.USERSDELETE_FAILURE),
    tap((data) =>{
      console.log("Users Deleted Failed: "+data);
    })
  );

}