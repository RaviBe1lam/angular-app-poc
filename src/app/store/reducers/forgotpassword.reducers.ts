import { All, ForgotPasswordActionTypes } from '../actions/forgotpassword.actions';
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
        case ForgotPasswordActionTypes.FORGOTPASSWORD_SUCCESS: {
            return {
                ...State,
                successMessage: 'Password Changed Successfully',
                errorMessage: null
            };
        }
        case ForgotPasswordActionTypes.FORGOTPASSWORD_FAILURE: {
            return{
                ...State,
                errorMessage: 'Invalid Username/Password',
                successMessage: null
            };
        }
        default: {
            return State;
        }
    }
}