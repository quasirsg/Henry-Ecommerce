import { getProducts, getOneProduct, editProduct } from "./productActions";
import { getCategory, editCategory } from "./categoryActions";
import { deleteProdCategory } from "./productCategoryActions";
import { editUser} from "./userActions";
import { getOrder, postOrder, deleteOrder, deleteProductOrder, addAmountOrder, substractAmountOrder } from "./ordenActions";
const allActions = {
  getProducts,
  getOneProduct,
  editProduct,
  getCategory,
  editCategory,
  editUser,
  getOrderCart,
  postOrderCart,
  getOrder,
  postOrder,
  deleteOrder,
  deleteProductOrder,
  addAmountOrder,
  addAmountOrder,
};

export default allActions;
