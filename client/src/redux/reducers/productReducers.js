import { GET_PRODUCTS } from "../actions/actionTypes";

const initialState = {
    products: []
}

function productReducers(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
        default:
            return state
    }
}

export default productReducers;