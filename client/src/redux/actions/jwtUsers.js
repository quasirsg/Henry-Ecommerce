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
            userLoguin: res.data,
          });
        }
      });
  } catch {
    return dispatch({
      type: actionTypes.USER_LOGUIN_ERROR,
      message: "Error de login",
    });
  }
};

//obtener información actual del usuario y limitar permisos
export const getCurrentUser = () => (dispatch) => {
  let token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    let role = token.user.role;
    if (role === "client") {
      return dispatch({
        type: allActions.CURRENT_CLIENT_USER,
        info: {
          id: token.user.id,
          role: token.user.role,
          name: token.user.name,
        },
      });
    } else {
      return dispatch({
        type: allActions.CURRENT_ADMIN_USER,
        info: {
          id: token.user.id,
          role: token.user.role,
          name: token.user.name,
        },
      });
    }
  } else {
    return dispatch({
      type: allActions.NO_CURRENT_USER,
      message: "No existe usuario logueado",
    });
  }
};

//logout-> funciona logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: actionTypes.LOGOUT_USER,
  });
  Toast.fire({
    icon: "success",
    title: `Hasta la próxima`,
  });
};
