import { getProducts, getOneProduct, editProduct } from "./productActions";
import { getCategory, editCategory } from "./categoryActions";
import { deleteProdCategory } from "./productCategoryActions";
const allActions = {
  getProducts,
  getOneProduct,
  editProduct,
  getCategory,
  editCategory,
  //deleteProdCategory,
};

export default allActions;
