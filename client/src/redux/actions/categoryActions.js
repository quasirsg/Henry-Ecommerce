import axios from "axios";
//import * as actionTypes from "./actionTypes";
import Toast from "../../components/alerts/toast";
import {
  POST_CATEGORY,
  GET_CATEGORY,
  PUT_CATEGORY,
  DELETE_CATEGORY,
} from "./actionTypes";

const url = "http://localhost:3001";

export const getCategory = () => (dispatch) => {
  axios
    .get(`${url}/category/`)
    .then((res) => {
      dispatch({
        type: GET_CATEGORY,
        category: res.data.category,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const postCategory=(id, value)=>{

// }

export const editCategory = (id, action, values) => (dispatch) => {
  if (action === "post") {
    return axios
      .post(url + `/category/${id ? id : ""}`, {
        name: values.name,
        description: values.description,
      })
      .then((res) => {
        dispatch({
          type: POST_CATEGORY,
          category: res.data,
        });
        Toast.fire({
          icon: "success",
          title: `Se agregó la categoria: ${res.data.name}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (action === "put") {
    return axios
      .put(url + `/category/${id}`, {
        name: values.name,
        description: values.description,
      })
      .then((res) => {
        dispatch({
          type: PUT_CATEGORY,
          category: res.data,
        });
        Toast.fire({
          icon: "success",
          title: `Se editó la categoria: ${res.data.name}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (action === "delete") {
    return axios
      .delete(url + `/category/${id}`)
      .then((res) => {
        dispatch({
          type: DELETE_CATEGORY,
          id: id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  window.location.reload(true);
};
