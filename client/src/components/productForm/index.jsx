import React, { useState } from "react";
import "./product.css";
import { ClipboardPlus, ArrowLeftCircle } from "react-bootstrap-icons";
import { Button, Row, Col } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import CustomInput from "../custom/input";
import apiCall from "../../redux/api";

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const FormProduct = ({
  id,
  name = "",
  stock = 0,
  description = "",
  price = 0,
  allCategories = [],
  categories = [],
  image = "",
  action,
  icon,
  message,
  history,
}) => {
  const categoriesSelect = allCategories.map((item) => item.id);
  const categoryProduct = categories.length ? categories : [];

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const convertBase64 = (file) => {
    if (typeof file === "string") return file;
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
  };

  return (
    <Col
      lg="6"
      sm="10"
      xs="10"
      className="card shadow pl-3 pr-3 pb-4 pt-2 mb-3 mx-auto"
    >
      <Formik
        initialValues={{
          name,
          stock,
          description,
          price,
          category: 0,
          image,
        }}
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
          //Validar url
          const url = `/products/${id ? id : ""}`;

          // Convertir imagen en base64
          const imgBase64 = await convertBase64(values.image);

          //Request al backend
          let product = { ...values, image: imgBase64 };
          const data = action === "delete" ? null : product;

          console.log(values);
          apiCall(url, data, null, action)
            .then((response) => {
              //Una vez agregado el producto , le asigna una categoria
              const id = response.data.id;
              apiCall(
                `/products/${id}/category/${values.category}`,
                null,
                null,
                "post"
              ).then((response) => {
                resetForm();
                setSubmitting(false);
                Toast.fire({
                  icon,
                  title: `${message} ${values.name}`,
                });
              });
            })
            .catch((error) => {
              setSubmitting(false);
              Toast.fire({
                icon: "error",
                title: "Error: vuelve a intentarlo",
              });
            });
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
                  <div role="group" aria-labelledby="checkbox-group">
                    {" "}
                    {
                      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>Categorias</DropdownToggle>
                        <DropdownMenu>
                          {allCategories.map((item) => {
                            return (
                              <label key={item.id}>
                                <Field
                                  label="Categoria"
                                  type="checkbox"
                                  id={item.id}
                                  value={categoryProduct}
                                />
                                {item.name}
                              </label>
                            );
                          })}
                        </DropdownMenu>
                      </ButtonDropdown>
                    }
                  </div>

                  {/* <CustomInput
                    label="Categoría"
                    defaultValue={categoryProduct}
                    name="category"
                    type="checkbox"
                  ></CustomInput> */}
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
                  : action === "delete"
                  ? "Eliminar producto"
                  : action === "post"
                  ? "Agregar producto"
                  : null}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Col>
  );
};

export default FormProduct;
