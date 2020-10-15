import axios from "axios";
import * as actionTypes from "./actionTypes";

const url = `http://localhost:3001`;

export const getProducts = () => (dispatch) => {
  axios
    .get(url + "/products/")
    .then((res) => {
      dispatch({
        type: actionTypes.GET_PRODUCTS,
        products: res.data.products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getOneProduct = (id) => (dispatch) => {
  axios
    .get(url + `/products/` + `${id}`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_PRODUCT,
        productDetail: res.data.products,
      });
    })
    .catch((err) => console.log(err));
};

export const editProduct = (id, action, values) => (dispatch) => {
  if (action === "post") {
    return axios
      .post(url + `/products/${id ? id : ""}`, values)
      .then((res) => {
        dispatch({
          type: actionTypes.POST_PRODUCT,
          productDetail: res.data,
        });
      })
      .catch((err) => console.log(err));
  } else if (action === "put") {
    return axios
      .put(url + `/products/${id}`, values)
      .then((res) => {
        dispatch({
          type: actionTypes.PUT_PRODUCT,
          productDetail: res.data,
        });
      })
      .catch((err) => console.log(err));
  } else if (action === "delete") {
    return axios
      .delete(url + `/products/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.DELETE_PRODUCT,
          productDetail: id,
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
