import { Action } from '@ngrx/store';

export enum ProductseditActionTypes{
    PRODUCTSEDIT = '[Productsedit] Productsedit',
    PRODUCTSEDIT_SUCCESS = '[Productsedit] Productsedit Success',
    PRODUCTSEDIT_FAILURE = '[Productsedit] Productsedit Failure',
}

export class Productsedit implements Action{
    readonly type = ProductseditActionTypes.PRODUCTSEDIT;
    constructor(public payload : any){}
}

export class ProductseditSuccess implements Action{
    readonly type = ProductseditActionTypes.PRODUCTSEDIT_SUCCESS;
    constructor(public payload : any){}
}

export class ProductseditFailure implements Action{
    readonly type = ProductseditActionTypes.PRODUCTSEDIT_FAILURE;
    constructor(public payload : any){}
}

export type All =  Productsedit | ProductseditSuccess | ProductseditFailure;