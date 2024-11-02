import { Action } from '@ngrx/store';

export enum UsersaddActionTypes{
    USERSADD = '[Usersadd] Usersadd',
    USERSADD_SUCCESS = '[Usersadd] Usersadd Success',
    USERSADD_EMAIL_FAILURE = '[Usersadd] Usersadd Email Failure',
    USERSADD_USERNAME_FAILURE = '[Usersadd] Usersadd Username Failure',
    USERSADD_FAILURE = '[Usersadd] Usersadd Failure'
}

export class Usersadd implements Action{
    readonly type = UsersaddActionTypes.USERSADD;
    constructor(public payload : any){}
}

export class UsersaddSuccess implements Action{
    readonly type = UsersaddActionTypes.USERSADD_SUCCESS;
    constructor(public payload : any){}
}

export class UsersaddEmailFailure implements Action{
    readonly type = UsersaddActionTypes.USERSADD_EMAIL_FAILURE;
    constructor(public payload : any){}
}

export class UsersaddUsernameFailure implements Action{
    readonly type = UsersaddActionTypes.USERSADD_USERNAME_FAILURE;
    constructor(public payload : any){}
}

export class UsersaddFailure implements Action{
    readonly type = UsersaddActionTypes.USERSADD_FAILURE;
    constructor(public payload : any){}
}

export type All = Usersadd | UsersaddSuccess | UsersaddEmailFailure | UsersaddUsernameFailure | UsersaddFailure;