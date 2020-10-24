// import {
//   GET_ORDER, //todas las ordenes
//   POST_ORDER,
//   GET_ONE_ORDER,
//   DELETE_ORDER,
//   UPDATE_ORDER,
// } from "../actions/actionTypes";

// const initialState = {
//   orders: [],
//   order: [],
// };

// function cartReducers(state = initialState, action) {
//   switch (action.type) {
//     case GET_ORDER:
//       return {
//         ...state,
//         orders: action.orders.data.map((order) => ({
//           //??
//           id: order.id,
//           status: order.status,
//         })),
//       };
//     case GET_ONE_ORDER:
//       return {
//         ...state,
//         order: action.order,
//       };
//     case POST_ORDER:
//       return {
//         ...state,
//         orders: state.orders.concat(action.order),
//       };
//     case UPDATE_ORDER:
//       return {
//         ...state,
//         orders: state.orders.map((order) => {
//           return order.id === action.order.id ? action.order : order;
//         }),
//       };
//     case DELETE_ORDER:
//       return {
//         ...state,
//         orders: state.orders.filter((order) => order.id === action.order.id),
//       };
//     default:
//       return state;
//   }
// }
// export default cartReducers;
