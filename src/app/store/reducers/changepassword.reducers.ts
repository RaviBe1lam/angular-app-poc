import { All, ChangePasswordActionTypes } from '../actions/changepassword.actions';
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
        case ChangePasswordActionTypes.CHANGEPASSWORD_SUCCESS: {
            return {
                ...State,
                successMessage: 'Password Changed Successfully',
                errorMessage: null
            };
        }
        case ChangePasswordActionTypes.CHANGEPASSWORD_FAILURE: {
            return{
                ...State,
                errorMessage: 'Password Change Failed',
                successMessage: null
            };
        }
        default: {
            return State;
        }
    }
}