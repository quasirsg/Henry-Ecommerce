import axios from "axios";
import * as actionTypes from "./actionTypes";

const url = "http://localhost:3001";

export const getCategory = () => (dispatch) => {
  axios
    .get(`${url}/category/`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_CATEGORY,
        category: res.data.category,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editCategory = (id, action, values) => (dispatch) => {
  if (action === "post") {
    axios
      .post(url + `/category/${id ? id : ""}`, values)
      .then((res) => {
        dispatch({
          type: actionTypes.POST_CATEGORY,
          category: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (action === "put") {
    axios
      .put(url + `/category/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.PUT_CATEGORY,
          category: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (action === "delete") {
    axios
      .delete(url + `/category/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.DELETE_CATEGORY,
          category: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
