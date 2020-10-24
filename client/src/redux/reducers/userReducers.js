import {
  POST_USER,
  PUT_USER,
  DELETE_USER,
  GET_USERS,
  ADD_PRODUCT_CART,
  ADD_PRODUCT_CART_GUEST,
  ADD_AMOUNT,
  SUBTRACT_AMOUNT,
  GET_CART_PRODUCTS,
  DELETE_PRODUCTS_CART,
  DELETE_PRODUCT_CART_GUEST,
  DELETE_ALL_PRODUCTS_CART_GUEST,
  GET_ONE_USER,
  GET_USER_ORDERS,
  GET_USERS_ORDERS,
  DELETE_ALL_CART,
  DELETE_AMOUNT_GUEST,
  ADD_AMOUNT_GUEST,
  ADD_ALL_PRODUCTS_CART_GUEST,
} from "../actions/actionTypes";

const initialState = {
  users: [],
  userDetail: [],
  err: [],
  carrito: [],
  message: "",
  orders: [],
  allOrders: [],
};

function userReducers(state = initialState, action) {
  console.log(action);
  let products = state.carrito;
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

    case ADD_PRODUCT_CART_GUEST:
      return {
        ...state,
        message: action.message,
      };
    case DELETE_PRODUCTS_CART:
      return {
        ...state,
        carrito: state.carrito.filter(
          (product) => product.id !== action.productId
        ),
      };

    case DELETE_PRODUCT_CART_GUEST:
      return {
        ...state,
        message: action.message,
      };
    case ADD_AMOUNT:
      state.carrito.map((product) => {
        if (product.id === action.product.product_id) {
          product.quantity++;
        }
      });
      return {
        ...state,
      };
    case ADD_AMOUNT_GUEST:
      return {
        ...state,
      };
    case SUBTRACT_AMOUNT:
      products.map((product) => {
        if (product.id === action.product.product_id) {
          if (product.quantity > 1) {
            product.quantity--;
          }
        }
      });
      return {
        ...state,
        carrito: state.carrito,
      };
    case DELETE_AMOUNT_GUEST:
      return {
        ...state,
      };
    case DELETE_ALL_CART:
      return {
        ...state,
        carrito: [],
      };
    case DELETE_ALL_PRODUCTS_CART_GUEST:
      return {
        ...state,
        message: action.message,
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

    case ADD_ALL_PRODUCTS_CART_GUEST:
      return {
        ...state,
        carrito: state.carrito.concat(action.products.productsCarts),
      };
    default:
      return state;
  }
}

export default userReducers;
