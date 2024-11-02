import { All, ProductsdeleteActionTypes } from '../actions/productsdelete.actions';
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
        case ProductsdeleteActionTypes.PRODUCTSDELETE_SUCCESS: {
            return {
                ...State,
                successMessage: 'Product Deleted Successfully',
                errorMessage: null
            };
        }
        case ProductsdeleteActionTypes.PRODUCTSDELETE_FAILURE: {
            return{
                ...State,
                errorMessage: 'Product Deleted Failed',
                successMessage: null
            };
        }
        default: {
            return State;
        }
    }
}