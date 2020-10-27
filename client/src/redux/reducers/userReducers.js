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
  GET_USER_ORDERS,
  DELETE_ALL_CART,
  DELETE_AMOUNT_GUEST,
  ADD_AMOUNT_GUEST,
  ADD_ALL_PRODUCTS_CART_GUEST,
  PROM_USER,
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
  console.log(action);
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
      return {
        ...state,
        carrito: state.carrito.map((product) => {
          if (product.id === action.product.product_id) {
            if (product.stock > action.product.quantity) {
              product.quantity = action.product.quantity;
            }
            return product;
          }
        }),
      };
    case ADD_AMOUNT_GUEST:
      return {
        ...state,
        carrito: action.carritoGuest,
      };
    case SUBTRACT_AMOUNT:
      return {
        ...state,
        carrito: products.map((product) => {
          if (product.id === action.product.product_id) {
            if (product.quantity > 1) {
              product.quantity = action.product.quantity;
            }
            return product;
          }
        }),
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
      return {
        ...state,
        carrito: action.products.map((item) => {
          return {
            id: item.linea_order.product_id,
            name: item.name,
            stock: item.stock,
            quantity: item.quantity,
            price: item.price,
            total: item.linea_order.total,
            image: item.image,
            description: item.description,
          };
        }),
      };
    case GET_USER_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };

    case ADD_ALL_PRODUCTS_CART_GUEST:
      return {
        ...state,
        carrito: state.carrito.concat(action.products.productsCarts),
      };
    case PROM_USER:
      const user = state.users.data.find((item) => item.id === action.user);
      user.role = "admin";
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default userReducers;
