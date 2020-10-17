import { GET_ORDER_CART, POST_ORDER_CART } from "../actions/actionTypes";

const initalState = {
    order: [],
};
function  orderReducer(state = initialState, action){
    switch (action.type) {
        case GET_ORDER:
      return {
        ...state,
        products: action.products,
      };
        case POST_OTDER:
          return{
            ...state,
          }
        case DELETE_ORDER:
          return {
            ...state,
          }
        case DELETE_PRODUCT_ORER:
          return {
            ...state,
          }

        case ADD_AMOUNT:
          return {
            ...state,
          }
        case SUBTRACT_AMOUNT_ORDER:
          return {
            ...state,
          }
          
    default:
      return state;
    }
}

export default orderReducer;