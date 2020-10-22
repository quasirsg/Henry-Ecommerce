import axios from "axios";
import * as actionTypes from "./actionTypes";

const url = `http://localhost:3001`;

export const getOrders = () => (dispatch) => {
    axios
    .get(url + "/order/")
    .then((res) => {
      dispatch({
        type: actionTypes.GET_ORDERS,
        order: res.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteOrder = (id) => (dispatch) => {
   return axios
    .delete(url + `/order/${id}`)
    .then((res) => {
        dispatch({
          type: actionTypes.DELETE_ORDER,
          order: res.data
        });
    }) 
    .catch((err) => console.log(err));
};


export const getOneOrder = (id) => (dispatch) => {
    return axios
    .get(url + `/order/${id}`)
    .then((res) => {
        dispatch({
            type:actionTypes.GET_ONE_ORDER,
            order: res.data
        })
    })
    .catch((err) => console.log(err));
};

export const updateStatusOrder = (id, status) => (dispatch) => {
    return axios
    .put(url + `/order/${id}`, status)
    .then((res)=> {
        dispatch({
            type: actionTypes.UPDATE_ORDER,
            order: res.data
        })
    });

}