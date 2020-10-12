import axios from "axios";
import apiCall from "../../redux/api";
import * as actionTypes from "./actionTypes";
const url = `http://localhost:3001/products/`;

export const getProducts = () => (dispatch) => {
  axios
    .get(url)
    .then((res) => {
      // console.log(res.data.products)
      dispatch({
        type: actionTypes.GET_PRODUCTS,
        products: res.data.products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


