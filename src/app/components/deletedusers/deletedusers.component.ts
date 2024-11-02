import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../users/user';
import { UserService } from '../../services/user.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-deletedusers',
  templateUrl: './deletedusers.component.html',
  styleUrls: ['./deletedusers.component.css']
})
export class DeletedusersComponent implements OnInit {
  data:  any[] = [];
  filteredData: any[] = [];
  isLoadingResults = false;
  p : number = 1;
  total : number;
  filter = false; 
  fp : number = 1;
  filteredUserName : String; 

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.getPage(1);
  }

  getPage(page: number) {
    console.log("Going to Page: "+page);
    this.isLoadingResults = true;
    this.userService.getDeletedPage(page).subscribe
    (products =>{
      console.log("Data: "+products);
      this.data = products;
      this.p = page;
      this.isLoadingResults = false;
    }
    )
  }

  applyFilter(filterValue: string) {
    console.log("Filter Deleted User inside");
    if(filterValue.length!=0)
    {
      console.log("Filter Deleted User inside");
      this.filter = true;
      this.isLoadingResults = true;
      this.userService.getDeletedUserFilter(filterValue, 1).subscribe(
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
    this.userService.getDeletedUserFilter(this.filteredUserName, page).subscribe(
      products => {
        console.log("Filtered Deleted Users: "+products);
       this.filteredData = products;
       this.fp = page;
        this.isLoadingResults = false;
      }
    )
    
  }


}