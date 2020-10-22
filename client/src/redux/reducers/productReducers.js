import {
  GET_PRODUCTS,
  GET_PRODUCT,
  POST_PRODUCT,
  ADD_PRODUCT_CATEGORY,
  REMOVE_CHANGE_PRODUCT_CATEGORY,
  PUT_PRODUCT,
  DELETE_PRODUCT,
  PUT_PRODUCT_FAILED,
  GET_PRODUCT_REVIEWS,
} from "../actions/actionTypes";

const initialState = {
  allProducts: [],
  productDetail: {},
  productReviews: {
    average: 5,
    reviews: [
      {
        points: 1,
        description: 'Loading',
        user: {
          name: '...',
          image: 'loading photo'
        }
      }]
  },
  loading: false,
  message: ''
};

function productReducers(state = initialState, action) {
  switch (action.type) {

    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: [...action.payload]
      };

    case GET_PRODUCT:
      return {
        ...state,
        productDetail: action.payload,
      };

    case GET_PRODUCT_REVIEWS:
      return {
        ...state,
        productReviews: {
          average: action.reviews.average,
          reviews: action.reviews.result,
        }
      }

    case POST_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload]
      };

    case ADD_PRODUCT_CATEGORY:
      return {
        ...state
      };

    case REMOVE_CHANGE_PRODUCT_CATEGORY:
      return {
        ...state
      };

    case PUT_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.map((item) => {
          if (item.id === action.payload.id) item = action.payload;
          return item;
        })
      };

    case PUT_PRODUCT_FAILED:
      return {
        ...state,
        message: action.payload
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
}

export default productReducers;
