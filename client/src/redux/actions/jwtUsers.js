import axios from "axios";
import Toast from "../../components/alerts/toast";
import * as actionTypes from "./actionTypes";
import allActions from "./allActions";

const url = `http://localhost:3001`;

//loguin  -> funciona loguin correcto e incorrecto.
export const loguinUser = (email, password) => (dispatch) => {
  try {
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
            userLoguin: res.data.user,
          });
        }
      });
  } catch {
    dispatch({
      type: actionTypes.USER_LOGUIN_ERROR,
      message: "Error de loguin",
    });
  }
};

//obtener información actual del usuario
export const getCurretnUser = () => (dispatch) => {
  let token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    console.log(token);
    return dispatch({
      type: actionTypes.CURRENT_USER,
      userDetail: {
        id: 1,
        role: 'client',
        name: 'bryan',
      },
    });
  } else {
    return dispatch({
      type: actionTypes.NOT_CURRENT_USER,
      message: "Usuaro no logueado",
    });
  }
};

//logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: actionTypes.LOGOUT_USER,
  });
  Toast.fire({
    icon: "info",
    title: `Hasta la proxima`,
  });
};
