import { Action } from '@ngrx/store';

export enum UserseditActionTypes{
    USERSEDIT = '[Usersedit] Usersedit',
    USERSEDIT_SUCCESS = '[Usersedit] Usersedit Success',
    USERSEDIT_EMAIL_FAILURE = '[Usersedit] Usersedit Email Failure',
    USERSEDIT_FAILURE = '[Usersedit] Usersedit Failure'
}

export class Usersedit implements Action{
    readonly type = UserseditActionTypes.USERSEDIT;
    constructor(public payload : any){}
}

export class UserseditSuccess implements Action{
    readonly type = UserseditActionTypes.USERSEDIT_SUCCESS;
    constructor(public payload : any){}
}

export class UserseditEmailFailure implements Action{
    readonly type = UserseditActionTypes.USERSEDIT_EMAIL_FAILURE;
    constructor(public payload : any){}
}

export class UserseditFailure implements Action{
    readonly type = UserseditActionTypes.USERSEDIT_FAILURE;
    constructor(public payload : any){}
}

export type All = Usersedit | UserseditSuccess | UserseditEmailFailure | UserseditFailure;