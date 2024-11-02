import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularpoc';
  showHeader = true;


  constructor(private router : Router){
    this.router.events.pipe(
      filter(e =>e instanceof NavigationEnd)
    ).subscribe(event => this.modifyHeader(event));    
  }

  ngOnInit(){
}

modifyHeader(location){
  if(location.url === '/welcome'){
    this.showHeader = true;
  }
  else if(location.url === '/products'){
    this.showHeader = true;
  }
  else if(location.url === '/users'){
    this.showHeader = true;
  }
  else if(location.url === '/deletedproducts'){
    this.showHeader = true;
  }
  else if(location.url === '/deletedusers'){
    this.showHeader = true;
  }
  else if(location.url === '/products/insertProduct'){
    this.showHeader = true;
  }
  else if(location.url === '/userProfile'){
    this.showHeader = true;
  }
  else if(location.url === '/changepassword'){
    this.showHeader = true;
  }
  else if(location.url === '/'){
    this.showHeader = false;
  }
  else if(location.url === '/forgotpassword'){
    this.showHeader = false;
  }
  
  else if(location.url === '/login/Invalid-Credentials'){
    this.showHeader = false;
  }
  else if(location.url === '/register'){
    this.showHeader = false;
  }
  else{
    this.showHeader = true;
  }
}

  }
