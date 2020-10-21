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
      .catch((err) => {
        dispatch({
          error: err,
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
//un usuario puede añadir una review a un producto que haya comprado
export const addReview = (productId, userId, points, description) => dispatch => {
  axios.post(url + '/products/' + productId + '/' + userId + '/review', {
    points,
    description,
  })
    .then(review => {
      dispatch({
        type: actionTypes.ADD_REVIEW,
        review,
      })
    })
    .catch(err => console.log(err));
}
//un usuario puede editar una review de un producto que haya comprado
export const editReview = (productId, reviewId, points, description) => dispatch => {
  axios.put(url + '/products/' + productId + '/review/' + reviewId, {
    points,
    description,
  })
    .then(newReview => {
      dispatch({
        type: actionTypes.EDIT_REVIEW,
        review: newReview,
      })
        .catch(err => console.log(err));
    })
}
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

// export const addAmount = ({ id }) => {
//   return {
//     type: ADD_AMOUNT,
//     productId: id,
//   };
// };

// export const subtractAmount = ({ id }) => {
//   return {
//     type: SUBTRACT_AMOUNT,
//     productId: id,
//   };
// };

// export const addProductCart = (productId, quantity) => dispatch => {
//   axios
//     .post(PathBase + '/users/' + 1 + '/cart',
//       {
//         productId: productId,
//         quantity: quantity
//       })
//     .then(res => {
//       console.log(res);
//       dispatch({
//         type: ADD_PRODUCT_CART,
//         data: "null"
//       })
//     })
// };

// export const deleteProductCart = ({ id }) => {
//   return {
//     type: DELETE_PRODUCTS_CART,
//     productId: id,
//   };
// };

// export const getCartProducts = () => (dispatch) => {
//   axios
//     .get(PathBase + '/users/' + 2 + '/cart')
//     .then(res => {
//       console.log('get_cart_products' + res);
//       dispatch({
//         type: GET_CART_PRODUCTS,
//         data: res
//       })
//     })
// };
