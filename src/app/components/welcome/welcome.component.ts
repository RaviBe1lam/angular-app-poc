import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as CryptoJS from 'crypto-js';
import * as jwt_decode from "jwt-decode";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userType: String | null;
  userName: String | null;
  token : string;
  constructor(private router : Router, private authService: AuthService) { }

  ngOnInit() {
    if(localStorage.getItem('value'))
    {
    const bytes = CryptoJS.AES.decrypt(localStorage.getItem('value'),'admin');
     if (bytes.toString()) {
       this.token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
     }
     console.log("decoded: "+jwt_decode(this.token));
    this.userName = jwt_decode(this.token).user_name;
    this.userType = jwt_decode(this.token).authorities[0];
    console.log("userType: "+this.userType);
    }
  }

  logout() {
    localStorage.removeItem('value');
    this.authService.deleteTokenUser(this.userName)
    .subscribe(data =>{
      console.log("Logged Out: "+data);
    });
    this.router.navigate(['']);
  }

  swagger(){
    // console.log("OUtside swagger");
    // this.http.get("http://localhost:8080/swagger-ui.html")
    // .subscribe(_ => {
    //   console.log("Inside swagger");
    // }, err => {
    //   console.log(err);
    // });

   window.open("http://localhost:8080/swagger-ui.html");
  }

}
