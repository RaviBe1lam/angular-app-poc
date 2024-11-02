import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MustMatch} from '../helperFunctions/helper';
import { Store } from '@ngrx/store';
import { AppState, selectSignupState } from '../../store/app.states';
import { Observable } from 'rxjs';
import { Signup } from '../../store/actions/signup.actions';
// import 'rxjs/add/operator/debounceTime';
import { debounceTime, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm : FormGroup;
submitted = false;
getState : Observable<any>;
errorMessage : String | null;
successMessage : String | null;

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private store : Store<AppState>
  ) {  
    this.getState = this.store.select(selectSignupState);
  }

  ngOnInit() {
    if(this.submitted == false)
    {
    this.registerForm = this.formBuilder.group({
      userName : ['',Validators.required],
      emailId : ['',Validators.required],
      contactNo : ['',Validators.required],
      password : ['',Validators.required],
      confirmPassword : ['',Validators.required]
    },{
      validators : MustMatch('password','confirmPassword')
    });
  }
  
  this.getState.subscribe((state) => {
    this.errorMessage = state.errorMessage;
    this.successMessage = state.successMessage;
  })  

  this.checkUserName();
  
  }

  get f() {return this.registerForm.controls;}

   get username(){
     return this.registerForm.get('userName') as FormControl;
   }

   get emailcheck(){
    return this.registerForm.get('emailId') as FormControl;
  }

  checkUserName(){
    this.username.valueChanges.pipe(
      debounceTime(500),
      tap(username =>{
        if(username!=null && username.includes("/") && username.length>0){
          console.log("hi: "+ username);
          this.username.setErrors({'incorrect' : true});
        }
      else if(username!=null && username != '' && !username.invalid){
          this.username.markAsPending();
        }
        else{
          this.username.setErrors({'invalid' : true});
        }
      })
    ).subscribe(username =>{
      if(username!=null && username.length>0 && !username.includes("/"))
      this.authService.userExists(username)
      .subscribe(data => {
        if(data != null){
          this.username.markAsPending({onlySelf:false});
          this.username.setErrors({notUnique:true});
        }
        else
        {
          this.username.markAsPending({onlySelf:false});
          this.username.setErrors(null);  
        }
      })
    });
  }

  // checkEmail(){
  //   this.emailcheck.valueChanges.pipe(
  //     debounceTime(500),
  //     tap(emailId =>{
  //       if(emailId != '' && !emailId.invalid){
  //         this.emailcheck.markAsPending();
  //       }
  //       else{
  //         this.emailcheck.setErrors({'invalid' : true});
  //       }
  //     })
  //   ).subscribe(email =>{
  //       this.emailcheck.setErrors({'incorrect' : null});
  //     this.authService.emailExists(email)
  //     .subscribe(data => {
  //       if(data != null){
  //         this.emailcheck.markAsPending({onlySelf:false});
  //         this.emailcheck.setErrors({notUnique:true});
  //       }
  //       else
  //       {
  //         this.emailcheck.markAsPending({onlySelf:false});
  //         this.emailcheck.setErrors(null);
  //       }
  //     })
  //   });
  // }
  
  onSubmit()
  {
    // this.checkEmail();
    this.submitted = true;

    const payload = {
      userName : this.f.userName.value,
      password : this.f.password.value,
      emailId : this.f.emailId.value,
      contactNo : this.f.contactNo.value
    };

    if(this.registerForm.valid)
    {
    this.store.dispatch(new Signup(payload));
    this.registerForm.reset();
    this.submitted = false;
    }
  }
}