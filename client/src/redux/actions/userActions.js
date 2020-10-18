import axios from "axios";
import {
  GET_CART_PRODUCTS,
  ADD_AMOUNT,
  SUBTRACT_AMOUNT,
  ADD_PRODUCT_CART,
  DELETE_PRODUCTS_CART,
  POST_USER,
  PUT_USER,
  DELETE_USER,
} from "./actionTypes";

const PathBase = `http://localhost:3001`;

export const editUser = (id, action, values) => (dispatch) => {
  if (action === "post") {
    return axios
      .post(PathBase + `/users/${id ? id : ""}`, values)
      .then((res) => {
        dispatch({
          type: POST_USER,
          userDetail: res.data,
        });
      })
      .catch((err) => console.log(err));
  } else if (action === "put") {
    return axios
      .put(PathBase + `/users/${id}`, values)
      .then((res) => {
        dispatch({
          type: PUT_USER,
          userDetail: res.data,
        });
      })
      .catch((err) => console.log(err));
  } else if (action === "delete") {
    return axios
      .delete(PathBase + `/users/${id}`)
      .then((res) => {
        dispatch({
          type: DELETE_USER,
          userDetail: id,
        });
      })
      .catch((err) => console.log(err));
  }
};

// export const putProduct=(id, action, values)=>(dispatch)=>{
//   return axios
//     .put(url+`/products/${id}`)ñ
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

export const addAmount = ({ id }) => {
  return {
    type: ADD_AMOUNT,
    productId: id,
  };
};

export const subtractAmount = ({ id }) => {
  return {
    type: SUBTRACT_AMOUNT,
    productId: id,
  };
};

export const addProductCart = (productId, quantity) => dispatch => {
  axios
    .post(PathBase + '/users/' + 1 + '/cart',
      {
        productId: productId,
        quantity: quantity
      })
    .then(res => {
      console.log(res);
      dispatch({
        type: ADD_PRODUCT_CART,
        data: "null"
      })
    })
};

export const deleteProductCart = ({ id }) => {
  return {
    type: DELETE_PRODUCTS_CART,
    productId: id,
  };
};

export const getCartProducts = () => (dispatch) => {
  axios
    .get(PathBase + '/users')
};
