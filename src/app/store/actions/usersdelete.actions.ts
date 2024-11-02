import { Action } from '@ngrx/store';

export enum UsersdeleteActionTypes{
    USERSDELETE = '[Usersdelete] Usersdelete',
    USERSDELETE_SUCCESS = '[Usersdelete] Usersdelete Success',
    USERSDELETE_FAILURE = '[Usersdelete] Usersdelete Failure'
}

export class Usersdelete implements Action{
    readonly type = UsersdeleteActionTypes.USERSDELETE;
    constructor(public payload : any){}
}

export class UsersdeleteSuccess implements Action{
    readonly type = UsersdeleteActionTypes.USERSDELETE_SUCCESS;
    constructor(public payload : any){}
}

export class UsersdeleteFailure implements Action{
    readonly type = UsersdeleteActionTypes.USERSDELETE_FAILURE;
    constructor(public payload : any){}
}


export type All = Usersdelete | UsersdeleteSuccess | UsersdeleteFailure;