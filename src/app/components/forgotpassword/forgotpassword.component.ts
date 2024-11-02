import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../helperFunctions/helper';
import { Observable } from 'rxjs';
import { AppState, selectForgotpasswordState } from '../../store/app.states';
import { Store } from '@ngrx/store';
import { Forgotpassword } from '../../store/actions/forgotpassword.actions';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm : FormGroup;
  errorMessage : String | null;
  getState : Observable<any>;
  submitted = false;
  successMessage : String | null;

  constructor(private formBuilder : FormBuilder,
    private store : Store<AppState>) {
      this.getState = this.store.select(selectForgotpasswordState);
     }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      userName : ['', Validators.required],
      emailId : ['',[Validators.required, Validators.email]],
      password : ['',Validators.required],
      confirmPassword : ['', Validators.required]
    },{
      validators : MustMatch('password','confirmPassword')
    });

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.successMessage = state.successMessage;
    }) 
  }

  get f()
  {
    return this.forgotPasswordForm.controls;
  }

  onSubmit()
  {
    this.submitted=true;
    const payload = {
      userName : this.f.userName.value,
      password : this.f.password.value,
      emailId : this.f.emailId.value,
    };
    if(this.forgotPasswordForm.valid)
    {
    this.store.dispatch(new Forgotpassword(payload));
    this.forgotPasswordForm.reset();
    this.submitted=false;
    }

  }
}
