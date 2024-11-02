import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../helperFunctions/helper';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { AppState, selectChangepasswordState } from '../../store/app.states';
import { Store } from '@ngrx/store';
import { Changepassword } from '../../store/actions/changepassword.actions';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  changePasswordForm : FormGroup;
  submitted = false;
  userName : String;
  errorMessage : String | null;
  getState : Observable<any>;
  successMessage : String | null;

  constructor(private formBuilder : FormBuilder, private authService : AuthService,private store : Store<AppState>) { 
    this.getState = this.store.select(selectChangepasswordState);
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      password : ['',Validators.required],
      confirmPassword : ['', Validators.required]
    },{
      validators : MustMatch('password','confirmPassword')
    });

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.successMessage = state.successMessage;
    }) 
    this.userName = this.authService.userName;
  }

  get f()
  {
    return this.changePasswordForm.controls;
  }

  onSubmit()
  {
    this.submitted=true;
     const payload = {
     userName : this.userName,
     password : this.f.password.value,
     };

    if(this.changePasswordForm.valid)
    {
      console.log("Change password works for "+this.userName);
      this.store.dispatch(new Changepassword(payload));
      this.changePasswordForm.reset();
      this.submitted=false;
    }

  }

}
