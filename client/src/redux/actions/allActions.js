import { getProducts, getOneProduct, editProduct } from "./productActions";
import { getCategory, editCategory } from "./categoryActions";

import { deleteProdCategory } from "./productCategoryActions";
import { editUser, getUsers } from "./userActions";
import { getOrders, deleteOrder, getOneOrder, updateStatusOrder} from "./ordenActions";

const allActions = {
  getProducts,
  getOneProduct,
  getCategory,
  editCategory,
  // deleteProdCategory,
  editUser,
  getUsers,
  getOrders,
  deleteOrder,
  getOneOrder,
  updateStatusOrder
};

export default allActions;
