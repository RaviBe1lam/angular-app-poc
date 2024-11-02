import { All, ProductsinsertActionTypes } from '../actions/productsinsert.actions';
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
        case ProductsinsertActionTypes.PRODUCTSINSERT_SUCCESS: {
            return {
                ...State,
                successMessage: 'Product Inserted Successfully',
                errorMessage: null
            };
        }
        case ProductsinsertActionTypes.PRODUCTSINSERT_FAILURE: {
            return{
                ...State,
                errorMessage: 'Product Already Exists',
                successMessage: null
            };
        }
        default: {
            return State;
        }
    }
}