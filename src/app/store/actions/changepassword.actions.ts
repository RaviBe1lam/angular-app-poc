import { Action } from '@ngrx/store';

export enum ChangePasswordActionTypes{
    CHANGEPASSWORD = '[ChangePassword] Changepassword',
    CHANGEPASSWORD_SUCCESS = '[ChangePassword] Changepassword Success',
    CHANGEPASSWORD_FAILURE = '[ChangePassword] Changepassword Failure',
}

export class Changepassword implements Action{
    readonly type = ChangePasswordActionTypes.CHANGEPASSWORD;
    constructor(public payload : any){}
}

export class ChangepasswordSuccess implements Action{
    readonly type = ChangePasswordActionTypes.CHANGEPASSWORD_SUCCESS;
    constructor(public payload : any){}
}

export class ChangepasswordFailure implements Action{
    readonly type = ChangePasswordActionTypes.CHANGEPASSWORD_FAILURE;
    constructor(public payload : any){}
}

export type All =  Changepassword | ChangepasswordSuccess | ChangepasswordFailure;