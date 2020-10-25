import {
  USER_LOGUIN,
  USER_LOGUIN_ERROR,
  LOGOUT_USER,
  CURRENT_USER,
  NOT_CURRENT_USER,
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
    case LOGOUT_USER:
      return {
        ...state,
        userDetail: [],
      };
    case CURRENT_USER:
      return {
        ...state,
        userDetail: state.userDetail.concat(action.userDetail),
      };
    case NOT_CURRENT_USER:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
}
export default jwtUserRducers;
