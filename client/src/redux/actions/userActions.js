import axios from "axios";
import * as actionTypes from "./actionTypes";

const url = `http://localhost:3001`;

export const getUsers = () => (dispatch) => {
  axios
    .get(url + "/users/")
    .then((res) => {
      dispatch({
        type: actionTypes.GET_USERS,
        users: res.data.users,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editUser = (id, action, values) => (dispatch) => {
  if (action === "post") {
    return axios
      .post(url + `/users/${id ? id : ""}`, values)
      .then((res) => {
        dispatch({
          type: actionTypes.POST_USER,
          userDetail: res.data,
        });
      })
      .catch((err) =>{
        dispatch({
          error: err
        });
      });
  } else if (action === "put") {
    return axios
      .put(url + `/users/${id}`, values)
      .then((res) => {
        dispatch({
          type: actionTypes.PUT_USER,
          userDetail: res.data,
        });
      })
      .catch((err) => console.log(err));
  } else if (action === "delete") {
    return axios
      .delete(url + `/users/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.DELETE_USER,
          userDetail: id,
        });
      })
      .catch((err) => console.log(err));
  }
};

// export const putProduct=(id, action, values)=>(dispatch)=>{
//   return axios
//     .put(url+`/products/${id}`)
//     .then(res=>{
//       console.log(res)
//       dispatch({
//         type: actionTypes.PUT_PRODUCT,
//         productDetail: res.data
//       })
//     })
//     .catch(err=>console.log(err))
// }

// export const deleteProduct=(id, action, values)=>dispatch=>{
//   return axios
//   .delete(url+`/products/${id ? id : ""}`, action === "delete" ? null : values)
//   .then(res=>{
//     dispatch({
//       type: actionTypes.DELETE_PRODUCT,
//       productDetail: res.data
//     })
//   })
//   .catch(err=>console.log(err))
// }
