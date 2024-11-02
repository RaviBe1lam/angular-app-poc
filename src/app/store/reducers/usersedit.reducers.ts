import { All, UserseditActionTypes } from '../actions/usersedit.actions';
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
        case UserseditActionTypes.USERSEDIT_SUCCESS: {
            return {
                ...State,
                successMessage: 'User Edit Successfully',
                errorMessage: null
            };
        }
        case UserseditActionTypes.USERSEDIT_EMAIL_FAILURE: {
            return{
                ...State,
                errorMessage: 'Email Already Exists',
                successMessage: null
            };
        }
        case UserseditActionTypes.USERSEDIT_FAILURE: {
            return{
                ...State,
                errorMessage: 'User Edit Failed',
                successMessage: null
            };
        }
        default: {
            return State;
        }
    }
}