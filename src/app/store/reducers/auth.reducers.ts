import {AuthUser} from '../../models/authUser'
import { All, AuthActionTypes } from '../actions/auth.actions';
export interface State{

isLoggedIn : boolean;
//If Authenticated User Object
user : AuthUser | null;

//Error Message
errorMessage : string | null;

}

export const initialState : State = {
    user : null,
    errorMessage : "Invalid Credetials",
    isLoggedIn : false
};

export function reducer(State = initialState, action: All) : State{
    switch(action.type){
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...State,
                isLoggedIn : true,
                user: {
                  token: action.payload.token,
                  userName: action.payload.username,
                  userType: action.payload.role
                },
                errorMessage: null
              };
            }
        case AuthActionTypes.LOGIN_FAILURE:{
            return {
                ...State,
                isLoggedIn : false,
                errorMessage: 'Invalid Credentials'
            };
        }
        
        default: {
            return State;
        }
    }
}