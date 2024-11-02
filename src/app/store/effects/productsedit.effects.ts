import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, EffectsModule} from "@ngrx/effects";
import { Observable } from "rxjs";
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import {ProductseditActionTypes, Productsedit, ProductseditSuccess, ProductseditFailure } from '../../store/actions/productsedit.actions';
import { Router } from '@angular/router';

@Injectable()
export class ProductseditEffects {

  constructor(
    private actions: Actions,
    private productService: ProductService,
    private router: Router
  ) {}

  @Effect()
  Productsedit : Observable<any> = this.actions.pipe(
    ofType(ProductseditActionTypes.PRODUCTSEDIT),
    map((action : Productsedit) => action.payload),
    switchMap((payload) =>{
      console.log("Products EDIT: "+payload);
      return this.productService.editProduct(payload).pipe(
        map((data) =>{
          console.log("data: "+data.message);
          if(data.message === "Product Edited successfully")
          {
          return new ProductseditSuccess(data.message)
          }
          else if (data.message === "Product Edit Operation Failed")
          {
          return new ProductseditFailure(data)
          }})
      );
    })
  );

  @Effect({dispatch: false})
  ProductseditSuccess : Observable<any> = this.actions.pipe(
    ofType(ProductseditActionTypes.PRODUCTSEDIT_SUCCESS),
    tap((data) =>{
        console.log("Product Edited: "+data);
        this.router.navigate(['products']);
    })
  );

  @Effect({dispatch: false})
  ProductseditFailure : Observable<any> = this.actions.pipe(
    ofType(ProductseditActionTypes.PRODUCTSEDIT_FAILURE),
    tap((data) =>{
      console.log("Product did not Edit: "+data);
    })
  );
}