import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, selectProductsdeleteState } from '../../store/app.states';
import { Observable } from 'rxjs';
import { Productsdelete } from '../../store/actions/productsdelete.actions';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import 'sweetalert2/src/sweetalert2.scss'
import * as CryptoJS from 'crypto-js';
import * as jwt_decode from "jwt-decode";
/* For Handling session timeout */
import { UserIdleService } from 'angular-user-idle';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  data:  any[] = [];
  filteredData: any[] = [];
  getState : Observable<any>;
  errorMessage : String | null;
  displayedColumns: string[];
  userType : any;
  token: String|null;
  isLoadingResults = false;
  p : number = 1;
  fp : number = 1;
  total : number;
  filter = false;
  filteredProductName : String;
  userName: String;

  constructor(private productService: ProductService, private authService: AuthService, private userIdle:UserIdleService, private router: Router, private store : Store<AppState>) {
    this.getState = this.store.select(selectProductsdeleteState);
   }

  ngOnInit() {
    this.isLoadingResults = true;
    const bytes = CryptoJS.AES.decrypt(localStorage.getItem('value'),'admin');
     if (bytes.toString()) {
       this.token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
     }
     this.userType = jwt_decode(this.token).authorities[0];

    if(this.userType === 'ADMIN'){
     this.displayedColumns = ['prodName', 'prodDesc', 'prodPrice','editColumn','deleteColumn'];
    }else{
      this.displayedColumns = ['prodName', 'prodDesc', 'prodPrice','editColumn'];
    }
    this.getPage(1);
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    }) 


      console.log("In Global component")
              //Start watching for user inactivity.
          this.userIdle.startWatching();
          // Start watching when user idle is starting and reset if user action is there.
          this.userIdle.onTimerStart().subscribe(count=> {
          var eventList= ["click", "mouseover","keydown","DOMMouseScroll","mousewheel",
          "mousedown","touchstart","touchmove","scroll","keyup"];
          console.log(count);
          for(let event of eventList) {
          document.body.addEventListener(event, () =>this.userIdle.resetTimer());
          }
          });
          // Start watch when time is up.
          this.userIdle.onTimeout().subscribe(() => {
            const bytes = CryptoJS.AES.decrypt(localStorage.getItem('value'),'admin');
            if (bytes.toString()) {
              this.token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            }
            console.log("decoded: "+jwt_decode(this.token));
           this.userName = jwt_decode(this.token).user_name;
          localStorage.removeItem('value');
          this.authService.deleteTokenUser(this.userName)
          .subscribe(data =>{
            console.log("Logged Out: "+data);
          });
          this.router.navigate(['']);
          this.userIdle.stopWatching();
          })


  }

  getPage(page: number) {
    console.log("Going to Page: "+page);
    this.isLoadingResults = true;
    this.productService.getPage(page).subscribe
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
    this.productService.getProductFilter(this.filteredProductName, page).subscribe(
      products => {
        console.log("Filtered Products: "+products);
       this.filteredData = products;
       this.fp = page;
        this.isLoadingResults = false;
      }
    )
    
  }

  insertProducts(){
    this.router.navigate(['products/insertProduct']);
  }

  editColumn(Name : String){
      this.router.navigate(['products/editProduct',Name]);
    }

     applyFilter(filterValue: string) {
       console.log("Filter products inside");
       if(filterValue.length!=0)
       {
         console.log("Filter products inside");
         this.filter = true;
         this.isLoadingResults = true;
      
         this.productService.getProductFilter(filterValue, 1).subscribe(
           products => {
             console.log("Filtered Products: "+products);
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

  deleteColumn(data : String){
    Swal.fire({
      title: 'Are you sure to delete Product '+data+'?',
      text: 'You will not be able to recover this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(new Productsdelete(data));
        setTimeout(()=>{ this.getPage(1);},500);
      }
      else{
        this.getPage(1);
      }
    })
  }

}
