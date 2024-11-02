import { Action } from '@ngrx/store';

export enum SignupActionTypes{
    SIGNUP = '[Signup] Signup',
    SIGNUP_SUCCESS = '[Signup] Signup Success',
    SIGNUP_USERNAME_FAILURE = '[Signup] Signup Username Failure',
    SIGNUP_EMAIL_FAILURE = '[Signup] Signup Email Failure',
    SIGNUP_FAILURE = '[Signup] Signup Failure'
}

export class Signup implements Action{
    readonly type = SignupActionTypes.SIGNUP;
    constructor(public payload : any){}
}

export class SignupSuccess implements Action{
    readonly type = SignupActionTypes.SIGNUP_SUCCESS;
    constructor(public payload : any){}
}

export class SignupUsernameFailure implements Action{
    readonly type = SignupActionTypes.SIGNUP_USERNAME_FAILURE;
    constructor(public payload : any){}
}

export class SignupEmailFailure implements Action{
    readonly type = SignupActionTypes.SIGNUP_EMAIL_FAILURE;
    constructor(public payload : any){}
}

export class SignupFailure implements Action{
    readonly type = SignupActionTypes.SIGNUP_FAILURE;
    constructor(public payload: any){}
}

export type All =  Signup | SignupSuccess | SignupUsernameFailure | SignupEmailFailure | SignupFailure;