// import axios from "axios";
// import * as actionTypes from "./actionTypes";

// const url = `http://localhost:3001`;

// //Crear una ordern
// export const createOrder = (userId, status) => (dispatch) => {
//   return axios
//     .post(url + `/order/${userId}`, status)
//     .then((res) => {
//       dispatch({
//         type: actionTypes.POST_ORDER,
//         order: res.data,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// //Obtener todas las ordenes (completas, canceladas, etc)
// export const getOrders = () => (dispatch) => {
//   axios
//     .get(url + `/orders/`)
//     .then((res) => {
//       dispatch({
//         type: actionTypes.GET_ORDER,
//         orders: res.data,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// //Obtener una orden particular
// export const getOneOrder = (id) => (dispatch) => {
//   axios
//     .get(url + `/orders/${id}`)
//     .then((res) => {
//       dispatch({
//         type: actionTypes.UPDATE_ORDER,
//         order: res.data,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// //Actualizar una orden
// export const upOrder = (id, status) => (dispatch) => {
//   axios
//     .put(url + `/orders/${id}`, status)
//     .then((res) => {
//       dispatch({
//         type: actionTypes.UPDATE_ORDER,
//         order: res.data,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// //Eliminar una orden
// export const deleteOrder = (id) => (dispatch) => {
//   axios
//     .delete(url + `/orders/${id}`)
//     .then((res) => {
//       dispatch({
//         type: actionTypes.DELETE_ORDER,
//         order: res.data,
//       });
//     })
//     .catch((err) => console.log(err));
// };
