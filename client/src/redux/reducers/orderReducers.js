import {
  GET_ORDERS,
  GET_ONE_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  GET_ORDER_BY_ID,
} from "../actions/actionTypes";

const initialState = {
  allOrders: [],
  orderDetail: {},
};
function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        allOrders: action.order,
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orderDetail: action.upOrder,
      };
    case DELETE_ORDER:
      return {
        ...state,
        allOrders: state.allOrders.filter((item) => item.id !== action.order),
      };
    case GET_ONE_ORDER:
      return {
        ...state,
        orderDetail: action.order,
      };
    case GET_ORDER_BY_ID:
      return {
        ...state,
        orderDetail: action.order,
      };

    default:
      return state;
  }
}

export default orderReducer;
