import axios from "axios";
import * as actionTypes from "./actionTypes";
import Toast from "../../components/alerts/toast";

const url = "http://localhost:3001";

export const adminActions = (id) => (dispatch) => {
  axios
    .put(`${url}/users/${id}/promote`)
    .then((res) => {
      dispatch({
        type: actionTypes.PROM_USER,
        user: id,
      });
      Toast.fire({
        icon: "success",
        title: "Usuario promovido",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
