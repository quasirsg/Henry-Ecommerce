import {
  ADD_PRODUCT_CART,
  ADD_AMOUNT,
  SUBTRACT_AMOUNT,
  GET_CART_PRODUCTS,
  DELETE_PRODUCTS_CART,
} from "../actions/actionTypes";

const initialState = {
  products: [],
};

function cartReducers(state = initialState, action) {
  let products = state.products;
  switch (action.type) {
    case ADD_PRODUCT_CART:
      return {
        ...state,
        products: products.concat(action.product),
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

export default cartReducers;
