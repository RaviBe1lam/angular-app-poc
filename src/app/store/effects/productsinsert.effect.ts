import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, EffectsModule} from "@ngrx/effects";
import { Observable } from "rxjs";
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import {ProductsinsertActionTypes, Productsinsert, ProductsinsertSuccess, ProductsinsertFailure } from '../../store/actions/productsinsert.actions';
import { Router } from '@angular/router';

@Injectable()
export class ProductsinsertEffects {

  constructor(
    private actions: Actions,
    private productService: ProductService,
    private router: Router
  ) {}

  @Effect()
  Productsinsert : Observable<any> = this.actions.pipe(
    ofType(ProductsinsertActionTypes.PRODUCTSINSERT),
    map((action : Productsinsert) => action.payload),
    switchMap((payload) =>{
      console.log("Products Insert: "+payload);
      return this.productService.insertProduct(payload).pipe(
        map((data) =>{
          console.log("data: "+data.message);
          if(data.message === "Product inserted successfully")
          {
            console.log("Products Inserted success");
          return new ProductsinsertSuccess(data.message)
          }
          else if (data.message === "Product Already Exists")
          {
            console.log("Products inserted failure");
          return new ProductsinsertFailure(data)
          }})
      );
    })
  );

  @Effect({dispatch: false})
  ProductsinsertSuccess : Observable<any> = this.actions.pipe(
    ofType(ProductsinsertActionTypes.PRODUCTSINSERT_SUCCESS),
    tap((data) =>{
        this.router.navigate(['products']);
      console.log("Product Inserted: "+data);
    })
  );

  @Effect({dispatch: false})
  ProductsinsertFailure : Observable<any> = this.actions.pipe(
    ofType(ProductsinsertActionTypes.PRODUCTSINSERT_FAILURE),
    tap((data) =>{
      console.log("Product did not Insert: "+data);
    })
  );
}