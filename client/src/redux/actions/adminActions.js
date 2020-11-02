import axios from "axios";
import * as actionTypes from "./actionTypes";
import Toast from "../../components/alerts/toast";
import { getOneUser, updateUser } from "./userActions";
import promDialog from "../../components/alerts/promDialog";

const url = "http://localhost:3001";

export const adminActions = (id, newRole, item) => (dispatch) => {
  promDialog(id).then((res) => {
    if (res.isConfirmed) {
      return axios
        .put(`${url}/users/${id}/promote`, {
          role: newRole,
        })
        .then((res) => {
          item.role = newRole;
          dispatch({
            type: actionTypes.PROM_USER,
            user: item,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};
