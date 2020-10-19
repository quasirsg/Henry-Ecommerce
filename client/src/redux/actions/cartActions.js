import axios from "axios";
import {
  GET_CART_PRODUCTS,
  ADD_AMOUNT,
  SUBTRACT_AMOUNT,
  ADD_PRODUCT_CART,
  DELETE_PRODUCTS_CART,
} from "./actionTypes";

const url = `http://localhost:3001`;

export const addAmount = ({ id }) => {
  return {
    type: ADD_AMOUNT,
    productId: id,
  };
};

export const subtractAmount = ({ id }) => {
  return {
    type: SUBTRACT_AMOUNT,
    productId: id,
  };
};

export const addProductCart = (product) => {
  return {
    type: ADD_PRODUCT_CART,
    product: product,
  };
};

export const deleteProductCart = ({ id }) => {
  return {
    type: DELETE_PRODUCTS_CART,
    productId: id,
  };
};

export const getCartProducts = () => (dispatch) => {

  return {
    type: GET_CART_PRODUCTS,
    products: [{
      id: 1,
      name: 'Producto 1',
      description: 'descripcion 1',


    }]
  }
};
