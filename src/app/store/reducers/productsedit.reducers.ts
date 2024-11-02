import { All, ProductseditActionTypes } from '../actions/productsedit.actions';
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
        case ProductseditActionTypes.PRODUCTSEDIT_SUCCESS: {
            return {
                ...State,
                successMessage: 'Product Edited Successfully',
                errorMessage: null
            };
        }
        case ProductseditActionTypes.PRODUCTSEDIT_FAILURE: {
            return{
                ...State,
                errorMessage: 'Product Edit Failed',
                successMessage: null
            };
        }
        default: {
            return State;
        }
    }
}