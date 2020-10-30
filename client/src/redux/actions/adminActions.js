import axios from "axios";
import * as actionTypes from "./actionTypes";
import Toast from "../../components/alerts/toast";

const url = "http://localhost:3001";

export const adminActions = (id, newRole) => (dispatch) => {
  return axios
    .put(`${url}/users/${id}/promote`, {
      role: newRole,
    })
    .then((res) => {
      dispatch({
        type: actionTypes.PROM_USER,
        id: res.data,
        role: newRole,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
