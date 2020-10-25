import {
  USER_LOGUIN,
  USER_LOGUIN_ERROR,
  AUTH_USER,
  LOGOUT_USER,
  CURRENT_CLIENT_USER,
  CURRENT_ADMIN_USER,
  NO_CURRENT_USER,
} from "../actions/actionTypes";

const initialState = {
  userDetail: [],
  login: "",
  message: "",
};

function jwtUserRducers(state = initialState, action) {
  switch (action.type) {
    /* ====== USERS LOGUINS ========== */
    case USER_LOGUIN:
      return {
        ...state,
        userDetail: state.userDetail.concat(action.userDetail),
      };
    case USER_LOGUIN_ERROR:
      return {
        ...state,
        message: action.message,
      };
    case AUTH_USER:
      return {
        ...state,
        message: action.auth,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userDetail: [],
      };

    case CURRENT_CLIENT_USER:
      return {
        ...state,
        userDetail: state.userDetail.concat(action.info),
      };
    case CURRENT_ADMIN_USER:
      return {
        ...state,
        userDetail: state.userDetail.concat(action.info),
      };
    case NO_CURRENT_USER:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
}
export default jwtUserRducers;
