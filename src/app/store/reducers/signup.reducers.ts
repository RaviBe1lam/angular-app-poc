import { All, SignupActionTypes } from '../actions/signup.actions';
export interface State{
//Error Message
errorMessage : String | null;

//Success Message
successMessage : String | null;
}

export const initialState : State = {
    errorMessage : null,
    successMessage : null
};

export function reducer(State = initialState, action: All) : State{
    switch(action.type){
        case SignupActionTypes.SIGNUP_SUCCESS: {
            return {
                ...State,
                successMessage: 'User Registered Successfully',
                errorMessage: null
            };
        }
        case SignupActionTypes.SIGNUP_USERNAME_FAILURE: {
            return{
                ...State,
                errorMessage: 'Username already Exists',
                successMessage: null
            };
        }
        case SignupActionTypes.SIGNUP_EMAIL_FAILURE: {
            return{
                ...State,
                errorMessage: 'Email Id already Exists',
                successMessage: null
            };
        }
        case SignupActionTypes.SIGNUP_FAILURE:{
            return{
                ...State,
                errorMessage : 'Register form invalid',
                successMessage: null  
            };
        }
        default: {
            return State;
        }
    }
}