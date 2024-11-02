import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import  {WelcomeComponent} from './components/welcome/welcome.component'
import {RegisterComponent} from './components/register/register.component';
import {ForgotpasswordComponent} from './components/forgotpassword/forgotpassword.component';
import {AuthGuard} from './services/auth.guard';
import { ProductsComponent } from './components/products/products.component';
import { ProductsInsertComponent } from './components/products-insert/products-insert.component';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { UsersComponent } from './components/users/users.component';
import { UserInsertComponent } from './components/user-insert/user-insert.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { DeletedproductsComponent } from './components/deletedproducts/deletedproducts.component';
import { DeletedusersComponent } from './components/deletedusers/deletedusers.component';
import { ErrorcomponentComponent } from './components/errorcomponent/errorcomponent.component';
const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
    data: {title: 'Login'}
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {title: 'Regsiter'}
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate : [AuthGuard],
    data: {title: 'Welcome'}
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    data : {title : 'ForgotPassword'}
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate : [AuthGuard],
    data : {title : 'Products'}
  },
  {
    path: 'products/insertProduct',
    component: ProductsInsertComponent,
    canActivate : [AuthGuard],
    data: {title : 'ProductsInsert'}
  },
  {
    path: 'products/editProduct/:Name',
    component: ProductsEditComponent,
    canActivate : [AuthGuard],
    data: {title: 'ProductsEdit'}
  },
  {
    path:'login/:Message',
    component: LoginComponent,
    data: {title: 'Login'}
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate : [AuthGuard],
    data : {title : 'Users'}
  },
  {
    path: 'users/insertUser',
    component: UserInsertComponent,
    canActivate : [AuthGuard],
    data: {title : 'UsersInsert'}
  },
  {
    path: 'users/editUser/:Name',
    component: UserEditComponent,
    canActivate : [AuthGuard],
    data: {title: 'UsersEdit'}
  },
  {
    path: 'userProfile',
    component : UserProfileComponent,
    canActivate : [AuthGuard],
    data: {title: 'UserProfile'}
  },
  {
    path:'changepassword',
    component: ChangepasswordComponent,
  canActivate : [AuthGuard],
    data : {title : 'Changepassword'}
  },
  {
    path:'deletedproducts',
    component: DeletedproductsComponent,
    canActivate: [AuthGuard],
    data : {title : 'deletedproducts'}
  },
  {
    path:'deletedusers',
    component: DeletedusersComponent,
    canActivate: [AuthGuard],
    data : {title : 'deletedusers'}
  },
  {
    path:'**',
    component: ErrorcomponentComponent,
    data: {title : 'ErrorPage'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
