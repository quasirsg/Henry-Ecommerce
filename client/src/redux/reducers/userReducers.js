import {
  POST_USER,
  PUT_USER,
  DELETE_USER,
  GET_USERS,
  ADD_PRODUCT_CART,
  ADD_AMOUNT,
  SUBTRACT_AMOUNT,
  GET_CART_PRODUCTS,
  DELETE_PRODUCTS_CART,
  GET_ONE_USER,
  GET_USER_ORDERS,
  GET_USERS_ORDERS,
  DELETE_ALL_CART,
} from "../actions/actionTypes";

const initialState = {
  users: [],
  userDetail: [],
  err: [],

  carrito: [],
  orders: [],
  allOrders: [],
  reviews: []
};

function userReducers(state = initialState, action) {
  let products = state.carrito;
  console.log(action);
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.users.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.description,
          rol: user.categories,
        })),
      };
    case GET_ONE_USER:
      return {
        ...state,
        userDetail: action.user,
      };

    case POST_USER:
      console.log(action);
      return {
        ...state,
        users: state.concat(action.userDetail),
        err: state.concat(action.error),
      };
    case PUT_USER:
      return {
        ...state,
        users: state.users.map((item) => {
          return item.id === action.userDetail.id ? action.userDetail : item;
        }),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((item) => item.id !== action.userDetail.id),
      };
    case ADD_PRODUCT_CART:
      return {
        ...state,
        carrito: state.carrito.concat(action.product),
      };
    case DELETE_PRODUCTS_CART:
      return {
        ...state,
        carrito: state.carrito.filter(
          (product) => product.product.id !== action.productId
        ),
      };
    case ADD_AMOUNT:
      state.carrito.map((product) => {
        if (product.product.id === action.product.product_id) {
          ++product.product.quantity;
        }
      });
      console.log(state.carrito);
      return {
        ...state,
        carrito: state.carrito,
      };
    case SUBTRACT_AMOUNT:
      products.map((product) => {
        if (product.product.id === action.product.product_id) {
          if (product.product.quantity >= 1) {
            --product.product.quantity;
          }
        }
      });
      console.log(state.carrito);
      return {
        ...state,
        carrito: state.carrito,
      };
    case DELETE_ALL_CART:
      return {
        ...state,
        carrito: [],
      };
    case GET_CART_PRODUCTS:
      return {
        ...state,
        carrito: state.carrito,
      };
    case GET_USER_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    default:
      return state;
  }
}

export default userReducers;
