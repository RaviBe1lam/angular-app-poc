import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, EffectsModule} from "@ngrx/effects";
import { Observable } from "rxjs";
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import {ProductsrestoreActionTypes, Productsrestore, ProductsrestoreSuccess, ProductsrestoreFailure } from '../../store/actions/productsrestore.actions';
import { Router } from '@angular/router';

@Injectable()
export class ProductsrestoreEffects {

  constructor(
    private actions: Actions,
    private productService: ProductService,
    private router: Router
  ) {}

  @Effect()
  Productsrestore : Observable<any> = this.actions.pipe(
    ofType(ProductsrestoreActionTypes.PRODUCTSRESTORE),
    map((action : Productsrestore) => action.payload),
    switchMap((payload) =>{
      return this.productService.RestoreProduct(payload).pipe(
        map((data) =>{
          if(data.message === "Product Restored successfully")
          {
          return new ProductsrestoreSuccess(data.message)
          }
          else if (data.message === "Product Restore Operation Failed")
          {
          return new ProductsrestoreFailure(data)
          }})
      );
    })
  );

  @Effect({dispatch: false})
  ProductsrestoreSuccess : Observable<any> = this.actions.pipe(
    ofType(ProductsrestoreActionTypes.PRODUCTSRESTORE_SUCCESS),
    tap((data) =>{;
         console.log("Navigated to Deleted Products");
    })
  );

  @Effect({dispatch: false})
  ProductsrestoreFailure : Observable<any> = this.actions.pipe(
    ofType(ProductsrestoreActionTypes.PRODUCTSRESTORE_FAILURE),
    tap((data) =>{
      // console.log("Product is not deleted: "+data);
    })
  );
}