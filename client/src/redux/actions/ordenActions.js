import axios from "axios";
import * as actionTypes from "./actionTypes";

const url = `http://localhost:3001`;

export const getOrder = () => (dispatch) => {
  axios
    .get(url + "//")
    .then((res) => {
      dispatch({
        type: actionTypes.GET_ORDER,
        order: res.data.order,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postOrder = (id, values) => (dispatch) => {
  return axios
    .post(url + `/ /${id ? id : ""}`, values)
    .then((res) => {
      dispatch({
        type: actionTypes.POST_ORDER,
        order: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteOrder = (id) => (dispatch) => {
  // clear limpia todoo
  return axios
    .post(url + `/ /${id ? id : ""}`)
    .then((res) => {
      dispatch({
        type: actionTypes.POST_ORDER,
        order: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteProductOrder = (id, values) => (dispatch) => {
  //Tacho de basura
  return axios
    .post(url + `/ /${id ? id : ""}`, values)
    .then((res) => {
      dispatch({
        type: actionTypes.POST_ORDER,
        order: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const addAmountOrder = (id, values) => (dispatch) => {
  //signo mas agrego cantidad
  return axios
    .post(url + `/ /${id ? id : ""}`, values)
    .then((res) => {
      dispatch({
        type: actionTypes.POST_ORDER,
        order: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const subtractAmountOrder = (id, values) => (dispatch) => {
  //signo menos quito cantidad
  return axios
    .post(url + `/ /${id ? id : ""}`, values)
    .then((res) => {
      dispatch({
        type: actionTypes.POST_ORDER,
        order: res.data,
      });
    })
    .catch((err) => console.log(err));
};
