import { All, UsersdeleteActionTypes } from '../actions/usersdelete.actions';
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
        case UsersdeleteActionTypes.USERSDELETE_SUCCESS: {
            return {
                ...State,
                successMessage: 'User deleted Successfully',
                errorMessage: null
            };
        }
        case UsersdeleteActionTypes.USERSDELETE_FAILURE: {
            return{
                ...State,
                errorMessage: 'uSER DELETE fAILURE',
                successMessage: null
            };
        }
        default: {
            return State;
        }
    }
}