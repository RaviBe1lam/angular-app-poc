import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, EffectsModule} from "@ngrx/effects";
import { Observable } from "rxjs";
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import {ProductsdeleteActionTypes, Productsdelete, ProductsdeleteSuccess, ProductsdeleteFailure } from '../../store/actions/productsdelete.actions';
import { Router } from '@angular/router';

@Injectable()
export class ProductsdeleteEffects {

  constructor(
    private actions: Actions,
    private productService: ProductService,
    private router: Router
  ) {}

  @Effect()
  Productsdelete : Observable<any> = this.actions.pipe(
    ofType(ProductsdeleteActionTypes.PRODUCTSDELETE),
    map((action : Productsdelete) => action.payload),
    switchMap((payload) =>{
      return this.productService.deleteProduct(payload).pipe(
        map((data) =>{
          if(data.message === "Product deleted successfully")
          {
          return new ProductsdeleteSuccess(data.message)
          }
          else if (data.message === "Product Delete Operation Failed")
          {
          return new ProductsdeleteFailure(data)
          }})
      );
    })
  );

  @Effect({dispatch: false})
  ProductsdeleteSuccess : Observable<any> = this.actions.pipe(
    ofType(ProductsdeleteActionTypes.PRODUCTSDELETE_SUCCESS),
    tap((data) =>{
         console.log("Navigated to products");
        this.router.navigate(['products']);
    })
  );

  @Effect({dispatch: false})
  ProductsdeleteFailure : Observable<any> = this.actions.pipe(
    ofType(ProductsdeleteActionTypes.PRODUCTSDELETE_FAILURE),
    tap((data) =>{
      // console.log("Product is not deleted: "+data);
    })
  );
}