import { getProducts, getOneProduct, editProduct } from "./productActions";
import { getCategory, editCategory } from "./categoryActions";

import { deleteProdCategory } from "./productCategoryActions";
import { editUser, getUsers } from "./userActions";

const allActions = {
  getProducts,
  getOneProduct,
  getCategory,
  editCategory,
  // deleteProdCategory,
  editUser,
  getUsers
};

export default allActions;
