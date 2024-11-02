import { All, ProductsrestoreActionTypes } from '../actions/productsrestore.actions';
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
        case ProductsrestoreActionTypes.PRODUCTSRESTORE_SUCCESS: {
            return {
                ...State,
                successMessage: 'Product Restored Successfully',
                errorMessage: null
            };
        }
        case ProductsrestoreActionTypes.PRODUCTSRESTORE_FAILURE: {
            return{
                ...State,
                errorMessage: 'Product Restored Failed',
                successMessage: null
            };
        }
        default: {
            return State;
        }
    }
}