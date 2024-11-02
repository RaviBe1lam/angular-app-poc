import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product';
import { FormGroup} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import * as CryptoJS from 'crypto-js';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  Name : String;
  data: Product;
  insertForm: FormGroup;
  userName : String;
  emailId : String;
  contactNo : Number;
  token : String;
  isLoadingResults = false;

   constructor(private authService: AuthService,private userService : UserService) { }

  ngOnInit() {
    this.isLoadingResults = true;
    if(localStorage.getItem('value'))
    {
    const bytes = CryptoJS.AES.decrypt(localStorage.getItem('value'),'admin');
     if (bytes.toString()) {
       this.token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
     }
    this.Name = jwt_decode(this.token).user_name;
    }

    this.getUser();
  }

  getUser() : void {
    this.userService.getUserProfile(this.Name)
      .subscribe(users => {
        this.userName = users.userName;
        this.emailId = users.emailId;
        this.contactNo = users.contactNo;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
      });
  }


}
