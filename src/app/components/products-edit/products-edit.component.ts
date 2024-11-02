import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../products/product';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectProductseditState } from '../../store/app.states';
import { Observable } from 'rxjs';
import { Productsedit } from '../../store/actions/productsedit.actions';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
 sub;
 Name : String;
 data: Product;
 insertForm: FormGroup;
 prodName : String;
 prodDesc : String;
 prodPrice : Number;
 getState : Observable<any>;
 errorMessage : String | null;


 matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router : Router, private activatedRoute : ActivatedRoute, private productService : ProductService,  private store : Store<AppState>) { 
    this.getState = this.store.select(selectProductseditState);
  }

  ngOnInit() {
    this.insertForm = this.formBuilder.group({
      'productName' : [null, Validators.required],
      'productDesc' : [null, Validators.required],
      'productPrice' : [null, Validators.required]
    });

    this.sub = this.activatedRoute.paramMap.subscribe(params =>{
      this.Name = params.get('Name');
    })

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    })  


    this.getProduct();
  }

  getProduct() : void {
    this.productService.getProduct(this.Name)
      .subscribe(products => {
        this.prodName = products.prodName;
        this.prodDesc = products.prodDesc;
        this.prodPrice = products.prodPrice;
      }, err => {
        console.log(err);
      });
  }

  onFormSubmit(form: NgForm) {
    this.store.dispatch(new Productsedit(form));
  }


}
