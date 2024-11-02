import { All, UsersaddActionTypes } from '../actions/usersadd.actions';
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
        case UsersaddActionTypes.USERSADD_SUCCESS: {
            return {
                ...State,
                successMessage: 'User Inserted Successfully',
                errorMessage: null
            };
        }
        case UsersaddActionTypes.USERSADD_EMAIL_FAILURE: {
            return{
                ...State,
                errorMessage: 'Email Exists',
                successMessage: null
            };
        }
        case UsersaddActionTypes.USERSADD_USERNAME_FAILURE: {
            return{
                ...State,
                errorMessage: 'Username Exists',
                successMessage: null
            };
        }
        case UsersaddActionTypes.USERSADD_EMAIL_FAILURE: {
            return{
                ...State,
                errorMessage: 'User Insert Failed',
                successMessage: null
            };
        }
        default: {
            return State;
        }
    }
}