import { Injectable } from '@angular/core';
import { Product } from '../components/welcome/product';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const apiUrl = 'http://localhost:8080/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private router: Router) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
      .pipe(
        tap(_ => this.log('fetched Products')),
        catchError(this.handleError('getProducts', []))
      );  }

  getdeletedProducts(): Observable<Product[]>{
    return this.http.get<Product[]>( 'http://localhost:8080/api/users/deletedproducts')
    .pipe(
      tap(_ => this.log('fetched deleted Products')),
      catchError(this.handleError('getdeletedProducts()',[]))
    );

  }

  getPage(page: any) : Observable<Product[]>{
    page=page-1;
    return this.http.get<Product[]>(apiUrl + '/pageproducts/'+ page)
    .pipe(
      tap(
        _ => this.log('fetched page')),
        catchError(this.handleError('getPage',[]))
    );
  }

  getDeletedPage(page: any) : Observable<Product[]>{
    page=page-1;
    return this.http.get<Product[]>(apiUrl + '/deletedPageproducts/'+ page)
    .pipe(
      tap(
        _ => this.log('fetched page')),
        catchError(this.handleError('getPage',[]))
    );
  }

  getDeletedProductFilter(prodName : any, page: any) : Observable<Product[]>{
    page = page-1;
    return this.http.get<Product[]>(apiUrl + '/findDeletedProductName/' +prodName + '/' + page)
    .pipe(
      tap(_ => this.log('fetched Deleted Filtered products')),
      catchError(this.handleError('getfilteredProducts()',[]))
    );
  }

  getProductFilter(prodName : any, page: any) : Observable<Product[]>{
    page = page-1;
    return this.http.get<Product[]>(apiUrl + '/findProductName/' +prodName + '/' + page)
    .pipe(
      tap(_ => this.log('fetched Filtered products')),
      catchError(this.handleError('getfilteredProducts()',[]))
    );
  }

  insertProduct(data: any) : Observable<any>{
    return this.http.post<any>(apiUrl + '/insertProduct', data)
    .pipe(
      tap(_ => this.log('Product Inserted')),
      catchError(this.handleError('products/insertProducts ', []))
    );
  }

  editProduct(data: any) : Observable<any>{
    return this.http.put<any>(apiUrl + '/editProduct', data)
    .pipe(
      tap(_ => this.log('Product Inserted')),
      catchError(this.handleError('products/insertProducts ', []))
    );
  }
  

  getProduct(data: String) : Observable<any>{
    return this.http.get<Product>(apiUrl + '/getProduct/'+ data)
    .pipe(
      tap(_ => this.log('Product Retreived')),
      catchError(this.handleError('products/editProduct/', []))
    );
  }

  deleteProduct(data: String) : Observable<any>{
    return this.http.delete<String>(apiUrl + '/deleteProduct/'+data)
    .pipe(
      tap(_ =>{
         console.log("Product is deleted");
    }),
      catchError(this.handleError('products', []))
    );
  }

  RestoreProduct(data: String) : Observable<any>{
    return this.http.post<String>(apiUrl + '/restoreProduct',data)
    .pipe(
      tap(_ =>{
        console.log("Product is Restored");
      }),
      catchError(this.handleError('products',[]))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
