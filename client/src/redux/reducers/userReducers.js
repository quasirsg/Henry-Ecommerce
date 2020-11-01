import {
  POST_USER,
  PUT_USER,
  DELETE_USER,
  GET_USERS,
  ADD_PRODUCT_CART,
  ADD_PRODUCT_CART_GUEST,
  ADD_AMOUNT,
  SUBTRACT_AMOUNT,
  GET_CART_PRODUCTS,
  DELETE_PRODUCTS_CART,
  DELETE_PRODUCT_CART_GUEST,
  DELETE_ALL_PRODUCTS_CART_GUEST,
  GET_ONE_USER,
  GET_USERS_ORDERS,
  DELETE_ALL_CART,
  DELETE_AMOUNT_GUEST,
  ADD_AMOUNT_GUEST,
  ADD_ALL_PRODUCTS_CART_GUEST,
  PROM_USER,
  GET_REVIEWS_BY_ID,
} from "../actions/actionTypes";

const initialState = {
  users: [],
  userDetail: [],
  err: [],
  carrito: [],
  message: "",
  orders: [],
  allOrders: [],
  reviews: [],
};

function userReducers(state = initialState, action) {
  let products = state.carrito;
  switch (action.type) {
    /* REDUCERS USUARIOS Y LOGUIN USUARIOS */
    case GET_USERS:
      return {
        ...state,
        users: action.users,
      };

    case GET_ONE_USER:
      return {
        ...state,
        userDetail: action.user,
      };

    case POST_USER:
      return {
        ...state,
        users: state.userDetail.concat(action.userDetail),
        err: state.userDetail.concat(action.error),
      };
    case PUT_USER:
      return {
        ...state,
        users: state.users.map((item) => {
          return item.id === action.userDetail.id ? action.userDetail : item;
        }),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((item) => item.id !== action.userDetail.id),
      };

    /* REDUCERS CARRITO DE USUARIOS */
    case ADD_PRODUCT_CART:
      return {
        ...state,
        carrito: state.carrito.concat(action.product),
      };

    case ADD_PRODUCT_CART_GUEST:
      return {
        ...state,
        message: action.message,
      };
    case DELETE_PRODUCTS_CART:
      return {
        ...state,
        carrito: state.carrito.filter(
          (product) => product.id !== action.productId
        ),
      };

    case DELETE_PRODUCT_CART_GUEST:
      return {
        ...state,
        carrito: action.newCart,
      };

    case ADD_AMOUNT:
      let addProducts = state.carrito.map((product) => {
        if (product.id === action.product.product_id) {
          if (product.stock > product.quantity) {
            product.quantity = action.product.quantity;
            product.total = action.product.total;
          }
        }
        return product;
      });
      return {
        ...state,
        carrito: addProducts,
      };

    case ADD_AMOUNT_GUEST:
      return {
        ...state,
        carrito: action.carritoGuest,
      };

    case SUBTRACT_AMOUNT:
      let subProducts = state.carrito.map((product) => {
        if (product.id === action.product.product_id) {
          if (product.quantity > 1) {
            product.quantity = action.product.quantity;
            product.total = action.product.total;
          }
        }
        return product;
      });
      return {
        ...state,
        carrito: subProducts,
      };
    case DELETE_AMOUNT_GUEST:
      return {
        ...state,
        carrito: action.carritoGuest,
      };
    case DELETE_ALL_CART:
      return {
        ...state,
        carrito: [],
      };
    case DELETE_ALL_PRODUCTS_CART_GUEST:
      return {
        ...state,
        carrito: [],
      };
    case GET_CART_PRODUCTS:
      console.log(action.products);
      let products = action.products.map((item) => {
        return {
          id: item.linea_order.product_id,
          name: item.name,
          stock: item.stock,
          quantity: item.linea_order.quantity,
          price: item.price,
          total: item.linea_order.total,
          image: item.image,
          description: item.description,
        };
      });
      return {
        ...state,
        carrito: products,
      };
    case GET_USERS_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case ADD_ALL_PRODUCTS_CART_GUEST:
      return {
        ...state,
        carrito: state.carrito.concat(action.products.productsCarts),
      };
    case PROM_USER:
      console.log(action);
      let user = state.userDetail;
      if (action.role === "admin") {
        user.role = action.role;
      } else if (action.role === "client") {
        user.role = action.role;
      }
      // state.users.map((item) => {
      //   if (item.id === action.id) {
      //     if (action.role === "admin") item.role = action.role;
      //   } else if (action.role === "client") {
      //     item.role = action.role;
      //   }
      //   return item;
      // }),
      return {
        ...state,
        userDetail: user,
      };
    case GET_REVIEWS_BY_ID:
      return {
        ...state,
        reviews: action.data,
      };
    default:
      return state;
  }
}

export default userReducers;
