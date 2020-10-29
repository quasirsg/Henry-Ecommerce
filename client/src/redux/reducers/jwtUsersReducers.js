import {
  USER_LOGIN,
  USER_LOGIN_ERROR,
  LOGOUT_USER,
  CURRENT_USER,
  NOT_CURRENT_USER,
  PUT_USER,
} from "../actions/actionTypes";

const initialState = {
  userDetail: {},
  login: "",
  message: "",
};

function jwtUserRducers(state = initialState, action) {
  switch (action.type) {
    /* ====== USERS LOGUINS ========== */

    case USER_LOGIN_ERROR:
      return {
        ...state,
        message: action.message,
      };
    case CURRENT_USER:
      return {
        ...state,
        userDetail: action.user,
      };
    case NOT_CURRENT_USER:
      return {
        ...state,
        message: action.message,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userDetail: {}
      };
    case PUT_USER:
      return {
        ...state,
        userDetail: action.data,
      }
    // case CURRENT_CLIENT_USER:
    //   return {
    //     ...state,
    //     userDetail: state.userDetail.concat(action.info),
    //   };
    // case CURRENT_ADMIN_USER:
    //   return {
    //     ...state,
    //     userDetail: state.userDetail.concat(action.info),
    //   };
    // case NO_CURRENT_USER:
    //   return {
    //     ...state,
    //     message: action.message,
    //   };
    case USER_LOGIN:

    default:
      return state;
  }
}
export default jwtUserRducers;
