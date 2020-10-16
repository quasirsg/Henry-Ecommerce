import { getProducts, getOneProduct, editProduct } from "./productActions";
import { getCategory, editCategory } from "./categoryActions";
import { deleteProdCategory } from "./productCategoryActions";
import { editUser} from "./userActions";
const allActions = {
  getProducts,
  getOneProduct,
  editProduct,
  getCategory,
  editCategory,
  // deleteProdCategory,
  editUser,


};

export default allActions;
