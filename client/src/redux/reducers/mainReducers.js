import productReducers from "./productReducers";
import categoryReducers from "./categoryReducers";
// import cartReducers from './cartReducers';
import searchReducer from "./searchReducer";
import userReducers from "./userReducers";

import { combineReducers } from "redux";

const mainReducers = combineReducers({
  products: productReducers,
  category: categoryReducers,
  search: searchReducer,
  // cart: cartReducers
  users: userReducers,
});

export default mainReducers;
