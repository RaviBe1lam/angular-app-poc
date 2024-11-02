import { Action } from '@ngrx/store';

export enum ForgotPasswordActionTypes{
    FORGOTPASSWORD = '[ForgotPassword] Forgotpassword',
    FORGOTPASSWORD_SUCCESS = '[ForgotPassword] Forgotpassword Success',
    FORGOTPASSWORD_FAILURE = '[ForgotPassword] Forgotpassword Failure',
}

export class Forgotpassword implements Action{
    readonly type = ForgotPasswordActionTypes.FORGOTPASSWORD;
    constructor(public payload : any){}
}

export class ForgotpasswordSuccess implements Action{
    readonly type = ForgotPasswordActionTypes.FORGOTPASSWORD_SUCCESS;
    constructor(public payload : any){}
}

export class ForgotpasswordFailure implements Action{
    readonly type = ForgotPasswordActionTypes.FORGOTPASSWORD_FAILURE;
    constructor(public payload : any){}
}

export type All =  Forgotpassword | ForgotpasswordSuccess | ForgotpasswordFailure;