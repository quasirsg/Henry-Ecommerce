import axios from "axios";
import * as actionTypes from "./actionTypes";
import Toast from "../../components/alerts/toast";
import DeleteDialog from "../../components/alerts/deleteDialog";
import Swal from "sweetalert2";

const url = `http://localhost:3001`;

export const getUsers = () => (dispatch) => {
  axios
    .get(url + "/users/")
    .then((res) => {
      dispatch({
        type: actionTypes.GET_USERS,
        users: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getOneUser = (id) => (dispatch) => {
  axios.get(url + `/users/${id}`).then((res) => {
    dispatch({
      type: actionTypes.GET_ONE_USER,
      user: res.data,
    });
  });
};

export const editUser = (id, action, values) => (dispatch) => {
  if (action === "post") {
    return axios
      .post(url + `/users/${id ? id : ""}`, values)
      .then((res) => {
        dispatch({
          type: actionTypes.POST_USER,
          userDetail: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          error: err,
        });
      });
  } else if (action === "put") {
    return axios
      .put(url + `/users/${id}`, values)
      .then((res) => {
        dispatch({
          type: actionTypes.PUT_USER,
          userDetail: res.data,
        });
      })
      .catch((err) => console.log(err));
  } else if (action === "delete") {
    return axios
      .delete(url + `/users/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.DELETE_USER,
          userDetail: id,
        });
      })
      .catch((err) => console.log(err));
  }
};

export const addProductCart = (userId, product) => (dispatch) => {
  return axios
    .post(url + `/users/${userId}/cart/add`, {
      productId: product.id,
      quantity: product.quantity,
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: actionTypes.ADD_PRODUCT_CART,
        product: res.data,
      });
    });
};

export const deleteProductsCart = (userId, productId) => (dispatch) => {
  return axios
    .delete(url + `/${userId}/cart/${productId}`)
    .then((res) => {
      dispatch({
        type: actionTypes.DELETE_PRODUCTS_CART,
        productId: productId,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProductCart = (userId) => (dispatch) => {
  axios
    .get(url + `/${userId}/cart`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_CART_PRODUCTS,
        products: res.data.products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addAmount = (userId, productId) => (dispatch) => {
  return axios
    .put(`/${userId}/cart/${productId}`)
    .then((res) => {
      dispatch({
        type: actionTypes.ADD_AMOUNT,
        productId: res.products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletAmount = (userId, productId) => (dispatch) => {
  axios
    .put(`/${userId}/cart/${productId}`)
    .then((res) => {
      dispatch({
        type: actionTypes.SUBTRACT_AMOUNT,
        productId: res.products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
