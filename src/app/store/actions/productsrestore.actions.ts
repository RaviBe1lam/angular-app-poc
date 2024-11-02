import { Action } from '@ngrx/store';

export enum ProductsrestoreActionTypes{
    PRODUCTSRESTORE = '[Productsrestore] Productsrestore',
    PRODUCTSRESTORE_SUCCESS = '[Productsrestore] Productsrestore Success',
    PRODUCTSRESTORE_FAILURE = '[Productsdrestore] Productsrestore Failure',
}

export class Productsrestore implements Action{
    readonly type = ProductsrestoreActionTypes.PRODUCTSRESTORE;
    constructor(public payload : any){}
}

export class ProductsrestoreSuccess implements Action{
    readonly type = ProductsrestoreActionTypes.PRODUCTSRESTORE_SUCCESS;
    constructor(public payload : any){}
}

export class ProductsrestoreFailure implements Action{
    readonly type = ProductsrestoreActionTypes.PRODUCTSRESTORE_FAILURE;
    constructor(public payload : any){}
}

export type All =  Productsrestore | ProductsrestoreSuccess | ProductsrestoreFailure;