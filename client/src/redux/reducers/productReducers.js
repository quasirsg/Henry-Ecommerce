import {
  GET_PRODUCTS,
  GET_PRODUCT,
  POST_PRODUCT,
  PUT_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  productDetail: [],
};

function productReducers(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products.map((prod) => ({
          id: prod.id,
          name: prod.name,
          description: prod.description,
          price: prod.price,
          stock: prod.stock,
          image: prod.image,
          categories: prod.categories,
        })),
      };
    case GET_PRODUCT:
      return {
        ...state,
        productDetail: action.productDetail,
      };
    case POST_PRODUCT:
      return {
        ...state,
        products: state.concat(action.productDetail),
      };
    case PUT_PRODUCT:
      console.log(state);
      return {
        ...state,
        products: state.products.map((item) => {
          return item.id === action.productDetail.id
            ? action.productDetail
            : item;
        }),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (item) => item.id !== action.productDetail.id
        ),
      };
    default:
      return state;
  }
}

export default productReducers;
