import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ClipboardPlus, ArrowLeftCircle } from "react-bootstrap-icons";
import { Button, Row, Col } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../custom/input";

import {
  addNewProduct,
  updateProduct,
} from "../../redux/actions/productActions";
import "./product.css";

const useSelectorProduct = (id) => {
  return useSelector((state) => {
    const products = state.products.allProducts;
    if (!id) return {};
    return products.find((item) => item.id === parseInt(id));
  });
};

const FormProduct = ({ action, history, id = 0 }) => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.category.category);
  const product = useSelectorProduct(id);
  // Filtrar categorias con ID
  const categoriesSelect = allCategories.map((item) => item.id);
  const categoryProduct =
    action === "put" ? product.categories.map((item) => item.id) : [];
  // Form inputs values
  let initialValuesForm = {
    name: action === "put" ? product.name : "",
    stock: action === "put" ? product.stock : "",
    description: action === "put" ? product.description : "",
    price: action === "put" ? product.price : "",
    category: action === "put" ? categoryProduct : [],
    image: action === "put" ? product.image : "",
  };

  const convertBase64 = (file) => {
    if (typeof file === "string") {
      return file;
    } else {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    }
  };

  return (
    <Col
      lg="6"
      sm="10"
      xs="10"
      className="card shadow pl-3 pr-3 pb-4 pt-2 mb-3 mx-auto"
    >
      <Formik
        enableReinitialize={true}
        initialValues={initialValuesForm}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(4, "Debe tener al menos 4 caracteres")
            .max(50, "Debe tener 50 caracteres o menos")
            .required("Debes completar este campo"),
          stock: Yup.number()
            .min(1, "Debe tener un producto en stock")
            .max(1000, "Debe tener 1000 productos o menos")
            .required("Debes completar este campo"),
          description: Yup.string()
            .min(10, "Debe tener al menos 10 caracteres")
            .max(500, "Debe tener 400 caracteres o menos")
            .required("Debes completar este campo"),
          price: Yup.number()
            .min(1, "Debe tener un precio mayor a $1")
            .required("Debes completar este campo"),
          category: Yup.number()
            .oneOf(categoriesSelect, "Categoría invalida") //Las categorias debe traerlas de la bd
            .required("Debes seleccionar una categoría"),
          image: Yup.string().required("Debes cargar una imagen"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // Convertir imagen en base64
          const imgBase64 = await convertBase64(values.image);

          console.log(imgBase64);
          //Agregar img64 al obj producto
          let product = { ...values, image: imgBase64 };
          // Verificar tipo de accion enviada
          action === "post" && dispatch(addNewProduct(product));
          action === "put" &&
            dispatch(updateProduct(id, product, categoryProduct));
          // Resetear o no , el formulari dependiendo la accion
          if (action === "put") initialValuesForm = product;
          action === "post" && resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Form>
              <Col className="rounded-lg text-center">
                {action === "put" ? (
                  <Row>
                    <Button
                      className="btn btn-light text-secondary btn-sm float-left"
                      onClick={() => history.push("/admin/products")}
                    >
                      <ArrowLeftCircle size={20} />
                    </Button>
                  </Row>
                ) : (
                  ""
                )}
                <Row className="d-block">
                  <ClipboardPlus className="mb-1 mr-2" size={40} />
                  <h2>Productos</h2>
                </Row>
              </Col>
              <hr className="mt-0 mb-3" />
              <Row>
                <Col>
                  <CustomInput
                    label="Nombre"
                    name="name"
                    type="text"
                    placeholder="Remera deportiva"
                  />
                </Col>
                <Col>
                  <CustomInput
                    label="Imagen"
                    name="image"
                    type="file"
                    setFieldValue={setFieldValue}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <CustomInput
                    label="Descripción"
                    name="description"
                    type="textarea"
                    placeholder="Una remera deportiva nueva"
                  />
                </Col>
                <Col xs="12" lg="6">
                  <CustomInput
                    label="Categoría"
                    name="category"
                    type="select"
                    multiple
                  >
                    <option value="0">Seleccionar categoría</option>
                    {allCategories.map((item) => (
                      <option key={item.name} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </CustomInput>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col lg="6" xs="6">
                      <CustomInput label="Stock" name="stock" type="number" />
                    </Col>
                    <Col xs="6">
                      <CustomInput label="Precio" name="price" type="number" />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Button
                block
                className="bg-color-primary shadow-primary rounded-pill border-0"
                type="submit"
              >
                {isSubmitting
                  ? "Cargando..."
                  : action === "put"
                  ? "Actualizar producto"
                  : "Agregar producto"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Col>
  );
};

export default FormProduct;
