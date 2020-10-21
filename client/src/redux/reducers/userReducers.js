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
} from "../actions/actionTypes";

const initialState = {
  users: [],
  userDetail: [],
  err: [],
  carrito: [],
  ordenes: [],
};

function userReducers(state = initialState, action) {
  let products = state.products;
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
      console.log(action);
      return {
        ...state,
        carrito: state.carrito.concat(action.product),
      };
    case DELETE_PRODUCTS_CART:
      return {
        ...state,
        products: products.filter((product) => product.id !== action.productId),
      };
    case ADD_AMOUNT:
      const productsUpdate = products.map((product) => {
        if (product.id === action.productId) {
          product.quantity = product.quantity + 1;
        }
      });
      return {
        ...state,
        products: productsUpdate,
      };
    case SUBTRACT_AMOUNT:
      const productsUp = products.map((product) => {
        if (product.id === action.productId) {
          product.quantity = product.quantity - 1;
        }
      });
      return {
        ...state,
        products: productsUp,
      };
    case GET_CART_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    default:
      return state;
  }
}

export default userReducers;
