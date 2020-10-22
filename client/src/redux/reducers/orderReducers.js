import {GET_ORDERS, GET_ONE_ORDER, DELETE_ORDER, UPDATE_ORDER } from "../actions/actionTypes";

const initialState = {
    allOrders: [],
    orderDetail: {}
};
function  orderReducer(state = initialState, action){
    console.log(action);
    switch (action.type) {
        case GET_ORDERS:
         return {
        ...state,
        allOrders: action.order,
      };
        case UPDATE_ORDER:
          return{
            ...state,
        orderDetail: action.order
          }
        case DELETE_ORDER:
          return {
            ...state,
          }
        case GET_ONE_ORDER:
          return {
            ...state,
        orderDetail: action.order
          }
          
    default:
      return state;
    }
}

export default orderReducer;