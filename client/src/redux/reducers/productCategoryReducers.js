import { DELETE_PRODUCT_CATEGORY } from "../actions/actionTypes";

const initialState = {
  productsCategory: [],
};

function productsCategoryReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_PRODUCT_CATEGORY:
      return {
        ...state,
        productsCategory: state.productsCategory.filter(
          (item) => item.id !== action.product_category.id
        ),
      };
    default:
      return state;
  }
}
