import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Product } from '../products/product';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import 'sweetalert2/src/sweetalert2.scss'
import { Productsrestore } from '../../store/actions/productsrestore.actions';
import { Store } from '@ngrx/store';
import { AppState, selectProductsrestoreState } from '../../store/app.states';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deletedproducts',
  templateUrl: './deletedproducts.component.html',
  styleUrls: ['./deletedproducts.component.css']
})
export class DeletedproductsComponent implements OnInit {
  data:  any[] = [];
  filteredData: any[] = [];
  getState : Observable<any>;
  isLoadingResults = false;
  p : number = 1;
  fp : number = 1;
  total : number;
  filter = false;
  filteredProductName : String;
  
  constructor(private productService : ProductService,  private store : Store<AppState>) { 
    this.getState = this.store.select(selectProductsrestoreState);
  }

  ngOnInit() {
    this.isLoadingResults = true;
    this.getPage(1);
  }

  getPage(page: number) {
    console.log("Going to Page: "+page);
    this.isLoadingResults = true;
    this.productService.getDeletedPage(page).subscribe
    (products =>{
      console.log("Data: "+products);
      this.data = products;
      this.p = page;
      this.isLoadingResults = false;
    }
    )
  }

  getFilteredPage(page: number){
    this.isLoadingResults = true;
    this.productService.getDeletedProductFilter(this.filteredProductName, page).subscribe(
      products => {
        console.log("Filtered Deleted Products: "+products);
       this.filteredData = products;
       this.fp = page;
        this.isLoadingResults = false;
      }
    )
  }

  applyFilter(filterValue: string) {
    console.log("Filter Deleted products inside");
    if(filterValue.length!=0)
    {
      console.log("Filter Deleted products inside");
      this.filter = true;
      this.isLoadingResults = true;
      this.productService.getDeletedProductFilter(filterValue, 1).subscribe(
        products => {
          console.log("Filtered Deleted Products: "+products);
         this.filteredData = products;
          this.isLoadingResults = false;
        }
      )
    }
    else{
      this.filter = false;
      this.getPage(1);
    }
  }
  


  RestoreColumn(data: String)
  {
    Swal.fire({
      title: 'Are you sure to Restore Product '+data+'?',
      text: 'You can view this in Products list!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Restore it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(new Productsrestore(data));
        setTimeout(()=>{ this.getPage(1)},500);
      }
      else{
        this.getPage(1);
      }
    }) 
  }


}
