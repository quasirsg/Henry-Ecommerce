import { getProducts, getOneProduct } from "./productActions";
import { getCategory } from "./categoryActions";
import { editUser, getUsers } from "./userActions";
import {
  getOrders,
  deleteOrder,
  getOneOrder,
  updateStatusOrder,
} from "./ordenActions";

const allActions = {
  getProducts,
  getOneProduct,
  getCategory,
  //editCategory,
  editUser,
  getUsers,
  getOrders,
  deleteOrder,
  getOneOrder,
  updateStatusOrder,
};

export default allActions;
