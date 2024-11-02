import { Action } from '@ngrx/store';

export enum ProductsdeleteActionTypes{
    PRODUCTSDELETE = '[Productsdelete] Productsdelete',
    PRODUCTSDELETE_SUCCESS = '[Productsdelete] Productsdelete Success',
    PRODUCTSDELETE_FAILURE = '[Productsdelete] Productsdelete Failure',
}

export class Productsdelete implements Action{
    readonly type = ProductsdeleteActionTypes.PRODUCTSDELETE;
    constructor(public payload : any){}
}

export class ProductsdeleteSuccess implements Action{
    readonly type = ProductsdeleteActionTypes.PRODUCTSDELETE_SUCCESS;
    constructor(public payload : any){}
}

export class ProductsdeleteFailure implements Action{
    readonly type = ProductsdeleteActionTypes.PRODUCTSDELETE_FAILURE;
    constructor(public payload : any){}
}

export type All =  Productsdelete | ProductsdeleteSuccess | ProductsdeleteFailure;