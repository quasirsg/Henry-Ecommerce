import {
  GET_CATEGORY,
  PUT_CATEGORY,
  DELETE_CATEGORY,
  POST_CATEGORY,
} from "../actions/actionTypes";

const initialState = {
  category: [],
};

function categoryReducers(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: action.category.map((cat) => ({
          name: cat.name,
          id: cat.id,
          description: cat.description,
        })),
      };

    case PUT_CATEGORY:
      return {
        ...state,
        category: state.category.map((item) => {
          if (item.id === action.category.id) {
            item = action.category;
          }
          return item;
        }),
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        category: state.category.filter((item) => item.id !== action.id),
      };

    case POST_CATEGORY:
      return {
        ...state,
        category: state.category.concat(action.category),
      };

    default:
      return state;
  }
}

export default categoryReducers;
