import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../products/product';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { AppState, selectUserseditState } from '../../store/app.states';
import { Observable } from 'rxjs';
import { Usersedit } from '../../store/actions/usersedit.actions';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  sub;
  Name : String;
  data: Product;
  insertForm: FormGroup;
  userName : String;
  emailId : String;
  contactNo : Number;
  getState : Observable<any>;
  errorMessage : String | null;

  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router : Router, private activatedRoute : ActivatedRoute, private userService : UserService, private store : Store<AppState>) {
    this.getState = this.store.select(selectUserseditState);
   }

  ngOnInit() {
    this.insertForm = this.formBuilder.group({
      'userName' : [null, Validators.required],
      'emailId' : [null, Validators.required],
      'contactNo' : [null, Validators.required]
    });
    this.sub = this.activatedRoute.paramMap.subscribe(params =>{
      this.Name = params.get('Name');
    })

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    })

    this.getUser();
  }

  getUser() : void {
    console.log("Get User: "+this.Name)
    this.userService.getUser(this.Name)
      .subscribe(users => {
        this.userName = users.userName;
        this.emailId = users.emailId;
        this.contactNo = users.contactNo;
      }, err => {
        console.log(err);
      });
  }

  onFormSubmit(form: NgForm) {
    this.store.dispatch(new Usersedit(form));
  }

}
