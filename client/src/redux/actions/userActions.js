import axios from "axios";
import Swal from "sweetalert2";
import deleteDialog from "../../components/alerts/deleteDialog";
import Toast from "../../components/alerts/toast";
import * as actionTypes from "./actionTypes";
import { GET_USERS_ORDERS } from './actionTypes';
const url = `http://localhost:3001`;

export const getUsers = () => (dispatch) => {
  axios
    .get(`${url}/users/`)
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

export const postUser = (user) => (dispatch) => {
  axios
    .post(`${url}/users/`, user)
    .then((res) => {
      dispatch({
        type: actionTypes.POST_USER,
        userDetail: res.data,
      });
      Toast.fire({
        icon: "success",
        title: `Se registro el usuario: ${user.name}`,
      });
    })
    .catch((err) => {
      dispatch({
        error: err,
      });
      Toast.fire({
        icon: "error",
        title: "Error al registrarse",
      });
    });
};

export const editUser = (id, values, action) => async (dispatch) => { };
//   if (action === "post") {
//     return axios
//       .post(`${url}/users/`, values)
//       .then((res) => {
//         dispatch({
//           type: actionTypes.POST_USER,
//           userDetail: res.data,
//         });
//       })
//       .catch((err) => {
//         dispatch({
//           error: err,
//         });
//       });
//   } else if (action === "put") {
//     return axios
//       .put(url + `/users/${id}`, values)
//       .then((res) => {
//         dispatch({
//           type: actionTypes.PUT_USER,
//           data: res.data,
//         });
//       })
//       .catch((err) => console.log(err));
//   } else if (action === "delete") {
//     return axios
//       .delete(url + `/users/${id}`)
//       .then((res) => {
//         dispatch({
//           type: actionTypes.DELETE_USER,
//           userDetail: id,
//         });
//       })
//       .catch((err) => console.log(err));
//   }
// };

//un usuario puede añadir una review a un producto que haya comprado

export const addReview = (productId, userId, points, description) => (
  dispatch
) => {
  axios
    .post(url + "/products/" + productId + "/" + userId + "/review", {
      points,
      description,
    })
    .then((review) => {
      dispatch({
        type: actionTypes.ADD_REVIEW,
        review,
      });
    })
    .catch((err) => console.log(err));
};

//un usuario puede editar una review de un producto que haya comprado
export const editReview = (productId, reviewId, points, description) => (
  dispatch
) => {
  axios
    .put(url + "/products/" + productId + "/review/" + reviewId, {
      points,
      description,
    })
    .then((newReview) => {
      dispatch({
        type: actionTypes.EDIT_REVIEW,
        review: newReview,
      }).catch((err) => console.log(err));
    });
};

export const getReviewsById = (userId) => (dispatch) => {
  axios
    .get(url + "/users/" + userId + "/reviews")
    .then((res) => {
      dispatch({
        type: actionTypes.GET_REVIEWS_BY_ID,
        data: res.data.data,
      });
    })
    .catch((err) => console.log(err));
};

//Agregar productos al carrito
export const addProductCart = (userId, product) => async (dispatch) => {
  try {
    if (!localStorage.token) {
      if (!localStorage.cart) {
        localStorage.setItem("cart", JSON.stringify([product]));
      }

      // Guardar carrito en localstorage
      const data = JSON.parse(localStorage.getItem("cart"));

      if (!data.some((item) => item.id === product.id)) {
        data.push(product);
        localStorage.setItem("cart", JSON.stringify(data));
      }

      // Mostrar mensaje 'Guardo en el carrito'
      Toast.fire({
        icon: "success",
        title: `Se agregó el producto: ${product.name.slice(0, 10)}`,
      });
      dispatch({
        type: actionTypes.ADD_PRODUCT_CART_GUEST,
        message: `Se agrego producto con ID: ${product.id} al carrito de invitado.`,
      });
    } else {
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
            product: res.data.product,
          });
          Toast.fire({
            icon: "success",
            title: `Se agregó el producto: ${product.name.slice(0, 15)}`,
          });
        });
    }
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: `Error: No se guardo "${product.name.slice(0, 10)}"`,
    });
  }
};

/*===== Agregar productos al carrito una vez se loguea  ======*/
export const addProducts = (userId, productsCarts) => async (dispatch) => {
  // Verificar que el usuario tenga un carrito

  const {
    data: { orderId },
  } = await axios.post(`${url}/order/${userId}`, {
    status: "shopping_cart",
  });
  // Agregar al carrito
  axios
    .post(`${url}/users/${userId}/cart`, {
      orderId: orderId,
      productsCarts: productsCarts,
    })
    .then((res) => {
      dispatch({
        type: actionTypes.ADD_ALL_PRODUCTS_CART_GUEST,
        products: res.data,
      });
    })
    .catch((error) => console.log(error));
};

//Eliminar productos del carrito
export const deleteProductsCart = (userId, productId, name) => (dispatch) => {
  deleteDialog(name).then((res) => {
    if (res.isConfirmed) {
      if (!localStorage.token) {
        if (localStorage.cart) {
          const oldCart = JSON.parse(localStorage.getItem("cart"));
          const newCart = oldCart.filter((item) => item.id !== productId);
          localStorage.setItem("cart", JSON.stringify(newCart));
          Swal.fire("Eliminado!", `${name} fue eliminado.`, "success");
          dispatch({
            type: actionTypes.DELETE_PRODUCT_CART_GUEST,
            carritoGuest: newCart,
          });
        }
      } else {
        axios
          .delete(`${url}/users/${userId}/cart/${productId}`)
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
    }
  });
};

//Obtener los productos agregados al carrito
export const getProductCart = (userId) => (dispatch) => {
  axios
    .get(`${url}/users/${userId}/cart`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_CART_PRODUCTS,
        products: res.data.data.products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//Incremento "+"
export const addAmount = (userId, productId, quantity) => (dispatch) => {
  if (!localStorage.token) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.map((item) => {
      if (item.id === productId) {
        if (item.quantity < item.stock) {
          item.quantity += 1;
          dispatch({
            type: actionTypes.ADD_AMOUNT_GUEST,
            carritoGuest: item,
          });
        }
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    axios
      .put(`${url}/users/${userId}/cart/${productId}`, {
        quantity: quantity,
        amount: "addAmount",
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
  }
};

//Decremento - "-"
export const deletAmount = (userId, productId, quantity) => (dispatch) => {
  if (!localStorage.token) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach((item) => {
      if (item.id === productId) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          dispatch({
            type: actionTypes.DELETE_AMOUNT_GUEST,
            carritoGuest: item,
          });
        }
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    axios
      .put(`${url}/users/${userId}/cart/${productId}`, {
        quantity: quantity,
        amount: "deleteAmount",
      })
      .then((res) => {
        dispatch({
          type: actionTypes.SUBTRACT_AMOUNT,
          product: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const deleteAllCart = (userId) => (dispatch) => {
  if (!localStorage.token) {
    if (localStorage.cart) {
      deleteDialog("Carrito").then((res) => {
        if (res.isConfirmed) {
          localStorage.removeItem("cart");
          Swal.fire("Eliminado!", `${"Carrito"} fue eliminado.`, "success");
          dispatch({
            type: actionTypes.DELETE_ALL_PRODUCTS_CART_GUEST,
          });
        }
      });
    }
  } else {
    deleteDialog("Carrito").then((res) => {
      if (res.isConfirmed) {
        axios.delete(`${url}/users/${userId}/cart`).then((res) => {
          dispatch({
            type: actionTypes.DELETE_ALL_CART,
            order: res.data,
          });
          Swal.fire("Eliminado!", `${"Carrito"} fue eliminado.`, "success");
        });
      }
    });
  }
};

export const getUsersOrders = (userId) => dispatch => {
  axios.get(url + '/users/' + userId + '/ordersall')
    .then(res => {
      dispatch({
        type: GET_USERS_ORDERS,
        payload: res.data.data,
      })
    })
}