import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupEffects} from './store/effects/signup.effects'
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.states';
import { AuthGuard } from './services/auth.guard';
import { AuthEffects } from './store/effects/auth.effects';
import { ProductsinsertEffects } from './store/effects/productsinsert.effect';
import { ProductseditEffects } from './store/effects/productsedit.effects';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ForgotpasswordEffects } from './store/effects/forgotpassword.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './components/users/users.component';
import { ProductService } from './services/product.service';
 import { TokenInterceptor } from './Interceptor/token.interceptor';
 import {ProductsrestoreEffects} from './store/effects/productsrestore.effects';
 import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {
  MatInputModule,
  MatPaginatorModule,
  MatSort,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule,
  MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './components/products/products.component';
import { ProductsInsertComponent } from './components/products-insert/products-insert.component';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { UserInsertComponent } from './components/user-insert/user-insert.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProductsdeleteEffects } from './store/effects/productsdelete.effects';
import { UsersaddEffects } from './store/effects/usersadd.effects';
import { UserseditEffects } from './store/effects/usersedit.effects';
import { UsersdeleteEffects } from './store/effects/usersdelete.effects';
import { ChangepasswordEffects } from './store/effects/changepassword.effects';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { DeletedproductsComponent } from './components/deletedproducts/deletedproducts.component';
import { DeletedusersComponent } from './components/deletedusers/deletedusers.component';
import { ErrorcomponentComponent } from './components/errorcomponent/errorcomponent.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {JwPaginationComponent} from 'jw-angular-pagination';
import { UserIdleModule } from 'angular-user-idle';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    ForgotpasswordComponent,
    UsersComponent,
    ProductsComponent,
    ProductsInsertComponent,
    ProductsEditComponent,
    UserInsertComponent,
    UserEditComponent,
    UserProfileComponent,
    ChangepasswordComponent,
    DeletedproductsComponent,
    DeletedusersComponent,
    ErrorcomponentComponent,
    JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,   
    HttpClientModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    StoreModule.forRoot(reducers,{}),
    EffectsModule.forRoot([AuthEffects, SignupEffects,ForgotpasswordEffects, ProductsinsertEffects, ProductseditEffects, ProductsdeleteEffects, UsersaddEffects, UserseditEffects, UsersdeleteEffects,
    ChangepasswordEffects,ProductsrestoreEffects]),
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    NgxPaginationModule,
    UserIdleModule.forRoot({idle:300, timeout:60}), //Idle Time: 5 Minutes, timeout: 1 Minute
  ],
  providers: [AuthService, AuthGuard, ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
