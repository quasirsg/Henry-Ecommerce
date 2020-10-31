import axios from "axios";
import Toast from "../../components/alerts/toast";
import Swal from "sweetalert2";
import * as actionTypes from "./actionTypes";
import allActions from "./allActions";

const url = `http://localhost:3001`;

//loguin  -> funciona loguin correcto e incorrecto.
export const loguinUser = (email, password) => (dispatch) => {
  try {
    axios
      .post(`${url}/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        console.log(token);
        if (token) {
          localStorage.setItem("token", token);
          dispatch({
            type: actionTypes.USER_LOGIN,
          });
          dispatch(getCurrentUser(token));
        }
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: "Error: email o contraseña no válidos",
        });
      });
  } catch {
    dispatch({
      type: actionTypes.USER_LOGIN_ERROR,
      message: "Error de login",
    });
  }
};

//obtener información del usuario logueado
export const getCurrentUser = (token) => async (dispatch) => {
  //Headers con Token
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  await axios.get(`${url}/users/me/`, config).then((res) => {
    dispatch({
      type: actionTypes.CURRENT_USER,
      user: res.data,
    });
  });
};

export const verifySession = () => (dispatch) => {
  const { token } = localStorage;
  if (token) {
    dispatch(getCurrentUser(token));
  } else {
    dispatch({
      type: actionTypes.NOT_CURRENT_USER,
      message: "No hay un usuario logueado.",
    });
  }
};

//logout
export const logoutUser = () => (dispatch) => {
  Swal.fire({
    html: `<h5>¿Deseas cerrar sesión?<h5/>`,
    width: "30%",
    icon: "info",
    showCancelButton: true,
    customClass: {
      confirmButton: "btn btn-sm btn-primary",
      cancelButton: "btn btn-sm btn-default border",
    },
    cancelButtonText: "Cancelar",
    confirmButtonText: "Cerrar sesión",
  }).then((res) => {
    if (res.isConfirmed) {
      Swal.fire("¡Has cerrado sesión!", `Hasta la proxima`, "info");
      localStorage.removeItem("token");
      dispatch({
        type: actionTypes.LOGOUT_USER,
      });
      dispatch({
        type: actionTypes.DELETE_ALL_CART,
      });
    }
  });
};
