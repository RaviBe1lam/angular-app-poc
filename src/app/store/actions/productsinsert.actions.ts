import { Action } from '@ngrx/store';

export enum ProductsinsertActionTypes{
    PRODUCTSINSERT = '[Productsinsert] Productsinsert',
    PRODUCTSINSERT_SUCCESS = '[Productsinsert] Productsinsert Success',
    PRODUCTSINSERT_FAILURE = '[Productsinsert] Productsinsert Failure',
}

export class Productsinsert implements Action{
    readonly type = ProductsinsertActionTypes.PRODUCTSINSERT;
    constructor(public payload : any){}
}

export class ProductsinsertSuccess implements Action{
    readonly type = ProductsinsertActionTypes.PRODUCTSINSERT_SUCCESS;
    constructor(public payload : any){}
}

export class ProductsinsertFailure implements Action{
    readonly type = ProductsinsertActionTypes.PRODUCTSINSERT_FAILURE;
    constructor(public payload : any){}
}

export type All =  Productsinsert | ProductsinsertSuccess | ProductsinsertFailure;