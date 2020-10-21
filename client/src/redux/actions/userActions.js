import axios from "axios";
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

// --------------- ACTION CART---------------

//Agregar productos al carrito
export const addProductCart = (userId, product) => async (dispatch) => {

  try {
    // Verificar que el usuario tenga un carrito
    const { data: { orderId } } = await axios.post(`${url}/order/${userId}`, {
      status: "shopping_cart",
    });

    axios.post(`${url}/users/${userId}/cart/add`, {
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
          title: `Se agregó el producto: ${product.name.slice(0,10)}`,
        });
      });

  } catch (error) {
    Toast.fire({
      icon: "error",
      title: `Error: No se guardo "${product.name.slice(0,10)}"`,
    });
  }

};

//Eliminar productos del carrito
export const deleteProductsCart = (userId, productId) => (dispatch) => {
  return axios
    .delete(url + `/${userId}/cart/${productId}`)
    .then((res) => {
      dispatch({
        type: actionTypes.DELETE_PRODUCTS_CART,
        productId: productId,
      });
    })
    .catch((err) => {
      console.log(err);
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
export const addAmount = (userId, productId) => (dispatch) => {
  return axios
    .put(`/${userId}/cart/${productId}`)
    .then((res) => {
      dispatch({
        type: actionTypes.ADD_AMOUNT,
        productId: res.products,
      });

    })
    .catch((err) => {
      console.log(err);
    });
};

//Decremento - "-"
export const deletAmount = (userId, productId) => (dispatch) => {
  axios
    .put(`/${userId}/cart/${productId}`)
    .then((res) => {
      dispatch({
        type: actionTypes.SUBTRACT_AMOUNT,
        productId: res.products,
      });
    })
    .catch((err) => {
      console.log(err);
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
