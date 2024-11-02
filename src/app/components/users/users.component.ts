import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState, selectUsersdeleteState } from '../../store/app.states';
import { Observable } from 'rxjs';
import { Usersdelete } from '../../store/actions/usersdelete.actions';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  data:  any[] = [];
  filteredData: any[] = [];
  getState : Observable<any>;
  errorMessage : String | null;
  isLoadingResults = false;
  p : number = 1;
  total : number;
  filter = false;
  fp : number = 1;
  filteredUserName : String;


  constructor(private userService: UserService, private router: Router,private store : Store<AppState>) {
    this.getState = this.store.select(selectUsersdeleteState);
   }

  ngOnInit() {
    this.isLoadingResults = true;
    this.getPage(1);
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    })
  }

  getPage(page: number) {
    console.log("Going to Page: "+page);
    this.isLoadingResults = true;
    this.userService.getPage(page).subscribe
    (products =>{
      console.log("Data: "+products);
      this.data = products;
      this.p = page;
      this.isLoadingResults = false;
    }
    )
  }

  
  applyFilter(filterValue: string) {
    console.log("Filter User inside");
    if(filterValue.length!=0)
    {
      console.log("Filter User inside");
      this.filter = true;
      this.isLoadingResults = true;
      this.userService.getUserFilter(filterValue, 1).subscribe(
        products => {
          console.log("Filtered Users: "+products);
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

  getFilteredPage(page: number){
    this.isLoadingResults = true;
    this.userService.getUserFilter(this.filteredUserName, page).subscribe(
      products => {
        console.log("Filtered Users: "+products);
       this.filteredData = products;
       this.fp = page;
        this.isLoadingResults = false;
      }
    )
    
  }


  insertUser(){
    this.router.navigate(['users/insertUser']);
  }

  editColumn(Name : String){
    console.log("User Edit: "+Name);
    this.userService.getUser(Name)
    .subscribe(res => {
      this.router.navigate(['users/editUser',Name]);
    }, (err) => {
      console.log(err);
      alert(err.error);
    });
    }

  deleteColumn(data : String){
    Swal.fire({
      title: 'Are you sure to delete User '+data+'?',
      text: 'You will not be able to recover this User!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(new Usersdelete(data));
        setTimeout(()=>{ this.getPage(1); console.log("Time out over") },500);
      } 
      //delay
      this.getPage(1);
    })
  }


}
