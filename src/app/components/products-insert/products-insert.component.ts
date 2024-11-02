import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { AppState, selectProductsinsertState } from '../../store/app.states';
import { Observable } from 'rxjs';
import { Productsinsert } from '../../store/actions/productsinsert.actions';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-products-insert',
  templateUrl: './products-insert.component.html',
  styleUrls: ['./products-insert.component.css']
})
export class ProductsInsertComponent implements OnInit {
  insertForm: FormGroup;
  productName = '';
  productDescription = '';
  productPrice = '';
  matcher = new MyErrorStateMatcher();
  getState : Observable<any>;
  errorMessage : String | null;
  
  constructor(private formBuilder: FormBuilder, private store : Store<AppState>) {
    this.getState = this.store.select(selectProductsinsertState);
   }


  ngOnInit() {
    this.insertForm = this.formBuilder.group({
      'productName' : [null, Validators.required],
      'productDesc' : [null, Validators.required],
      'productPrice' : [null, Validators.required]
    });

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    })  

  }

  onFormSubmit(form: NgForm) {
    this.store.dispatch(new Productsinsert(form));
  }


}
