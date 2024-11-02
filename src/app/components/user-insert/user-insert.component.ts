import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { AppState, selectUsersaddState } from '../../store/app.states';
import { Observable } from 'rxjs';
import { Usersadd } from '../../store/actions/usersadd.actions';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.css']
})
export class UserInsertComponent implements OnInit {
  insertForm: FormGroup;
  userName = '';
  emailId = '';
  contactNo = '';
  password = '';
  role = '';
  getState : Observable<any>;
  errorMessage : String | null;
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private store : Store<AppState>) { 
    this.getState = this.store.select(selectUsersaddState);
  }


  ngOnInit() {
    this.insertForm = this.formBuilder.group({
      'userName' : [null, Validators.required],
      'emailId' : [null, [Validators.required, Validators.email]],
      'contactNo' : [null, Validators.required],
      'password' : [null, Validators.required],
      'role' : [null, Validators.required]
    }); 

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    })

  }

  onFormSubmit(form: NgForm) {
    console.log(this.insertForm.controls.role.value);
    this.store.dispatch(new Usersadd(form));
  }

}
