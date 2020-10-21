import { POST_USER, PUT_USER, DELETE_USER, GET_USERS } from "../actions/actionTypes";

const initialState = {
  users: [],
  userDetail: [],
  err: [],
  reviews: []
};

function userReducers(state = initialState, action) {
  console.log(action);
  switch (action.type) {

    case GET_USERS:
      return {
        ...state,
        users: action.users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.description,
          rol: user.categories,
        })),
      };

    case POST_USER:
      return {
        ...state,
        users: state.concat(action.userDetail),
        err: state.concat(action.error),
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
    default:
      return state;
  }
}

export default userReducers;
