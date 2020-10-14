import axios from "axios";
import { GET_PRODUCTS } from "./actionTypes";

const url = `http://localhost:3001/products/`;

export const getProducts = () => dispatch => {
  axios
    .get(url)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        products: res.data.products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};