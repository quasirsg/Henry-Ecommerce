import axios from "axios";
import Toast from "../../components/alerts/toast";
import * as actionTypes from "./actionTypes";

const url = `http://localhost:3001`;

export const getOrders = () => (dispatch) => {
  axios
    .get(url + "/order/")
    .then((res) => {
      dispatch({
        type: actionTypes.GET_ORDERS,
        order: res.data.order,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteOrder = (id, userId) => (dispatch) => {
  axios.delete(`${url}/order/${id}`).then((res) => {
    dispatch({
      type: actionTypes.DELETE_ORDER,
      order: id,
    });
  });
  axios
    .delete(`${url}/users/${userId}/cart`)
    .then((res) => {
      dispatch({
        type: actionTypes.DELETE_ALL_CART,
        order: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getOneOrder = (userId) => (dispatch) => {
  axios
    .get(`${url}/order/${userId}`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_ONE_ORDER,
        order: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const updateStatusOrder = (id, status) => (dispatch) => {
  return axios
    .put(`${url}/order/${id}`, {
      status: status,
    })
    .then((res) => {
      dispatch({
        type: actionTypes.UPDATE_ORDER,
        upOrder: res.data.orderUpdate,
      });
      Toast.fire({
        icon: "success",
        title: `Gracias por tu compra!`,
      });
      // dispatch({
      //   type: actionTypes.DELETE_ALL_CART,
      // });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Line_order
export const getOrderById = (orderId) => (dispatch) => {
  return axios.get(`${url}/order/${orderId}`).then((res) => {
    dispatch({
      type: actionTypes.GET_ORDER_BY_ID,
      order: res.data[0],
    });
  });
};
