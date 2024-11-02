import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Login} from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sub;
loginForm : FormGroup;
getState : Observable<any>;
errorMessage : String |null;
submitted = false;
  constructor(private formBuilder: FormBuilder,
    private store : Store<AppState>,
    private activatedRoute : ActivatedRoute) {
      this.getState = this.store.select(selectAuthState);
     }

  ngOnInit() {
    if(this.errorMessage)
    {
      setTimeout( () => {
        this.errorMessage = null;
      }, 2000);
    }
    if(this.submitted == false)
    {
    this.loginForm = this.formBuilder.group({
      userName : ['',Validators.required],
      password: ['',Validators.required]
    });
  }
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    })

    this.sub = this.activatedRoute.paramMap.subscribe(params =>{
      this.errorMessage = params.get('Message');
    })
    
  }

  get f()
  {
    return this.loginForm.controls;
  }
 
  onSubmit()
  {
    this.submitted = true;

    if(this.f.userName.value === 'null')
    {
      this.errorMessage = 'Username should not be null';
      this.submitted = false;
      this.loginForm.reset();
    }
    else if (this.f.userName.value.includes("/"))
    {    
        this.errorMessage = 'Inavlid Username';
        this.submitted = false;
        this.loginForm.reset();
  
    }
    else{
    const payload = {
      userName : this.f.userName.value,
      password : this.f.password.value
    };
    if(this.loginForm.valid)
    {
    this.store.dispatch(new Login(payload));
    this.submitted=false;
    this.loginForm.reset();
    }
  }
  }

}
