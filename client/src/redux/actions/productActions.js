import {
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCT_REVIEWS,
  POST_PRODUCT,
  ADD_PRODUCT_CATEGORY,
  REMOVE_CHANGE_PRODUCT_CATEGORY,
  PUT_PRODUCT,
  PUT_PRODUCT_FAILED,
  DELETE_PRODUCT,
  GET_BANNERS,
} from "./actionTypes";
import axios from "axios";
import apiCall from "../api";
import Toast from "../../components/alerts/toast";
import DeleteDialog from "../../components/alerts/deleteDialog";
import Swal from "sweetalert2";

const url = "http://localhost:3001";

export const getProducts = () => (dispatch) => {
  axios
    .get(`${url}/products/`)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data.products,
      });
    })
    .catch((err) => {
      Toast.fire({
        icon: "error",
        title: "Error: No se cargaron los productos",
      });
    });
};

export const getReviews = (productId) => (dispatch) => {
  axios.get(url + "/products/" + productId + "/reviews").then((res) => {
    dispatch({
      type: GET_PRODUCT_REVIEWS,
      reviews: res.data,
    });
  });
};

export const getBanners = () => {
  return {
    type: GET_BANNERS,
  };
};

export const getOneProduct = (id) => (dispatch) => {
  apiCall(`/products/${id}`, null, null, "get")
    .then((res) => {
      dispatch({
        type: GET_PRODUCT,
        payload: res.data.products,
      });
    })
    .catch((err) => console.log(err));
};

export const addNewProduct = (product) => (dispatch) => {
  apiCall("/products/", product, null, "post")
    .then((res) => {
      dispatch({
        type: POST_PRODUCT,
        payload: res.data,
      });
      Toast.fire({
        icon: "success",
        title: `Se agregó el producto: ${res.data.name}`,
      });
    })
    .catch((err) => {
      Toast.fire({
        icon: "error",
        title: `Error: No se guardo "${product.name}"`,
      });
    });
};

export const updateProduct = (id, product, oldCategories) => (dispatch) => {
  try {
    //Antes de modificar un product, modificar categorias
    dispatch(
      updateProductCategory(id, oldCategories, product.category, product)
    );
  } catch (error) {
    dispatch({
      type: PUT_PRODUCT_FAILED,
      payload: error.message,
    });
  }
};

const updateProductCategory = (id, oldCategories, newCategories, product) => (
  dispatch
) => {
  try {
    //verificar si las categorias viejas fueron cambiadas, eliminarlas
    oldCategories.forEach(async (item) => {
      //Si la categoria fue cambiada , eliminarla de la tabla product_category
      const changedCategory = newCategories.some(
        (cat) => parseInt(cat) === item
      );
      if (!changedCategory) {
        await apiCall(`/products/${id}/category/${item}`, null, null, "delete");
        dispatch({
          type: REMOVE_CHANGE_PRODUCT_CATEGORY,
        });
      }
    });
    // Agregar nuevas categorias al poduct
    dispatch(addCategoryToProduct(id, newCategories, product));
  } catch (error) {
    dispatch({
      type: PUT_PRODUCT_FAILED,
      payload: error.message,
    });
  }
};

const addCategoryToProduct = (id, productCategory, product) => (dispatch) => {
  try {
    // Agregar categorias nuevas
    const promises = productCategory.map((item) =>
      apiCall(`/products/${id}/category/${item}`, null, null, "post")
    );
    Promise.all(promises).then((response) => {
      dispatch({ type: ADD_PRODUCT_CATEGORY });
      //Modificar product
      dispatch(setProduct(id, product));
    });
  } catch (error) {
    dispatch({
      type: PUT_PRODUCT_FAILED,
      payload: error.message,
    });
  }
};

const setProduct = (id, product) => (dispatch) => {
  apiCall(`/products/${id}`, product, null, "put")
    .then((res) => {
      dispatch({
        type: PUT_PRODUCT,
        payload: res.data,
      });
      Toast.fire({
        icon: "success",
        title: `Se actualizó: ${res.data.name} .`,
      });
    })
    .catch((error) => {
      dispatch({
        type: PUT_PRODUCT_FAILED,
        payload: error.message,
      });
      Toast.fire({
        icon: "error",
        title: `No se pudo actualizar: ${product.name} .`,
      });
    });
};

export const deleteProduct = (id, name) => (dispatch) => {
  DeleteDialog(name).then((result) => {
    if (result.isConfirmed) {
      apiCall(`/products/${id}`, null, null, "delete")
        .then((res) => {
          dispatch({
            type: DELETE_PRODUCT,
            payload: id,
          });
          Swal.fire("Eliminado!", `${name} fue eliminado.`, "success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};
