import { POST_USER, PUT_USER, DELETE_USER } from "../actions/actionTypes";

const initialState = {
  users: [],
  userDetail: [],
};

function userReducers(state = initialState, action) {
  console.log(action);
  switch (action.type) {

    case POST_USER:
      return {
        ...state,
        users: state.concat(action.userDetail),
      };
    case PUT_USER:
      return {
        ...state,
        users: state.users.map((item) => {
          return item.id === action.userDetail.id
            ? action.userDetail
            : item;
        }),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(
          (item) => item.id !== action.userDetail.id
        ),
      };
    default:
      return state;
  }
}

export default userReducers;
