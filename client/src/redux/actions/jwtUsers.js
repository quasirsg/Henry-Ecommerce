import axios from "axios";
import Swal from "sweetalert2";
import deleteDialog from "../../components/alerts/deleteDialog";
import Toast from "../../components/alerts/toast";
import * as actionTypes from "./actionTypes";

const url = `http://localhost:3001`;

//loguin de usuario
export const loguinUser = (email, password) => (dispatch) => {
  return axios
    .post(`${url}/users/login`, {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data));
        dispatch({
          type: actionTypes.USER_LOGUIN,
          userLoguin: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.USER_LOGUIN_ERROR,
        message: err.message,
      });
    });
};

export const authUser = () => (dispatch) => {
  //?????????????????????????????
  return axios.get(`${url}/users/secure`).then((res) => {
    dispatch({
      type: actionTypes.AUTH_USER,
      auth: res.data,
    });
  });
};

//obtener información actual del usuario
export const getCurretnUser = () => (dispatch) => {};

//logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: actionTypes.LOGOUT_USER,
  });
};
