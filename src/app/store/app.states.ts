import * as auth from './reducers/auth.reducers';
import { createFeatureSelector } from '@ngrx/store';
import * as signup from './reducers/signup.reducers';
import * as forgotpassword from './reducers/forgotpassword.reducers';
import * as productsinsert from './reducers/productsinsert.reducers';
import * as productsedit from './reducers/productsedit.reducers';
import * as productsdelete from './reducers/productsdelete.reducers';
import * as productsrestore from './reducers/productsrestore.reducers';
import * as usersadd from './reducers/usersadd.reducers';
import * as usersedit from './reducers/usersedit.reducers';
import * as usersdelete from './reducers/usersdelete.reducers';
import * as changepassword from './reducers/changepassword.reducers';

export interface AppState{
authState : auth.State;
signupState : signup.State;
forgotpasswordState: forgotpassword.State;
productsinsertState: productsinsert.State;
productseditState: productsedit.State;
productsdeleteState: productsdelete.State;
usersaddState: usersadd.State;
userseditState: usersedit.State;
usersdeleteState: usersdelete.State;
changepasswordState: changepassword.State;
productsrestoreState: productsrestore.State;
}
export const reducers = {
    auth : auth.reducer,
    signup : signup.reducer,
    forgotpassword : forgotpassword.reducer,
    productsinsert : productsinsert.reducer,
    productsedit : productsedit.reducer,
    productsdelete: productsdelete.reducer,
    usersadd: usersadd.reducer,
    usersedit: usersedit.reducer,
    usersdelete: usersdelete.reducer,
    changepassword: changepassword.reducer,
    productsrestore: productsrestore.reducer,
};

export const selectAuthState = createFeatureSelector<AppState>('auth');

export const selectSignupState = createFeatureSelector<AppState>('signup');

export const selectForgotpasswordState = createFeatureSelector<AppState>('forgotpassword');

export const selectProductsinsertState = createFeatureSelector<AppState>('productsinsert');

export const selectProductseditState = createFeatureSelector<AppState>('productsedit');

export const selectProductsdeleteState = createFeatureSelector<AppState>('productsdelete');

export const selectUsersaddState = createFeatureSelector<AppState>('usersadd');

export const selectUserseditState = createFeatureSelector<AppState>('usersedit');

export const selectUsersdeleteState = createFeatureSelector<AppState>('usersdelete');

export const selectChangepasswordState = createFeatureSelector<AppState>('changepassword');

export const selectProductsrestoreState = createFeatureSelector<AppState>('productsrestore');
