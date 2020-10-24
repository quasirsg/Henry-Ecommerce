import axios from "axios";
import Swal from "sweetalert2";
import deleteDialog from "../../components/alerts/deleteDialog";
import Toast from "../../components/alerts/toast";
import * as actionTypes from "./actionTypes";

const url = `http://localhost:3001`;

export const getUsers = () => (dispatch) => {
  axios
    .get(url + "/users/")
    .then((res) => {
      dispatch({
        type: actionTypes.GET_USERS,
        users: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getOneUser = (id) => (dispatch) => {
  axios.get(url + `/users/${id}`).then((res) => {
    dispatch({
      type: actionTypes.GET_ONE_USER,
      user: res.data,
    });
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

//Agregar productos al carrito
export const addProductCart = (userId, product) => async (dispatch) => {
  try {
    // Verificar que el usuario tenga un carrito
    const {
      data: { orderId },
    } = await axios.post(`${url}/order/${userId}`, {
      status: "shopping_cart",
    });

    axios
      .post(`${url}/users/${userId}/cart/add`, {
        orderId,
        productId: product.id,
        quantity: product.quantity,
      })
      .then((res) => {
        dispatch({
          type: actionTypes.ADD_PRODUCT_CART,
          product: res.data,
        });
        Toast.fire({
          icon: "success",
          title: `Se agregó el producto: ${product.name.slice(0, 10)}`,
        });
      });
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: `Error: No se guardo "${product.name.slice(0, 10)}"`,
    });
  }
};

//Eliminar productos del carrito
export const deleteProductsCart = (userId, productId, name) => (dispatch) => {
  deleteDialog(name).then((res) => {
    if (res.isConfirmed) {
      axios
        .delete(url + `/users/${userId}/cart/${productId}`)
        .then((res) => {
          dispatch({
            type: actionTypes.DELETE_PRODUCTS_CART,
            productId: productId,
          });
          Swal.fire("Eliminado!", `${name} fue eliminado.`, "success");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

//Obtenner los productos agregados al carrito
export const getProductCart = (userId) => (dispatch) => {
  axios
    .get(url + `/users/${userId}/cart`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_CART_PRODUCTS,
        products: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//Incremento "+"
export const addAmount = (userId, productId, quantity) => (dispatch) => {
  axios
    .put(url + `/users/${userId}/cart/${productId}`, {
      quantity: quantity,
    })
    .then((res) => {
      dispatch({
        type: actionTypes.ADD_AMOUNT,
        product: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Decremento - "-"
export const deletAmount = (userId, productId, quantity) => (dispatch) => {
  axios
    .put(url + `/users/${userId}/cart/${productId}`, { quantity: quantity })
    .then((res) => {
      dispatch({
        type: actionTypes.SUBTRACT_AMOUNT,
        product: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteAllCart = (userId) => (dispatch) => {
  deleteDialog("Carrito").then((res) => {
    if (res.isConfirmed) {
      axios.delete(url + `/users/${userId}/cart`).then((res) => {
        dispatch({
          type: actionTypes.DELETE_ALL_CART,
          order: res.data,
        });
        Swal.fire("Eliminado!", `${"Carrito"} fue eliminado.`, "success");
      });
    }
  });
};

//Obtener todas las ordenes de un usuario
export const getUserOrder = (id) => (dispatch) => {
  axios
    .get(url + `/users/orders/${id}`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_USER_ORDERS,
        orders: res.data,
      });
    })
    .catch((err) => console.log(err));
};
