import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BagCheck, ArrowLeftCircle } from "react-bootstrap-icons";
import { Button, Row, Col } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../custom/input";
import { useHistory } from "react-router-dom";

// import {
//   addNewProduct,
//   updateProduct,
// } from "../../redux/actions/productActions";
// import "./product.css";

// const useSelectorProduct = (id) => {
//   return useSelector((state) => {
//     const products = state.products.allProducts;
//     if (!id) return {};
//     return products.find((item) => item.id === parseInt(id));
//   });
// };


const CheckoutForm = ({ 
  email= "",
  direction= "" }) => {
  const history = useHistory ();
  const dispatch = useDispatch();

//   const allCategories = useSelector((state) => state.category.category);
//   const product = useSelectorProduct(id);
//   // Filtrar categorias con ID
//   const categoriesSelect = allCategories.map((item) => item.id);
//   const categoryProduct =
//     action === "put" ? product.categories.map((item) => item.id) : [];

  return (
    <Col
      lg="6"
      sm="10"
      xs="10"
      className="card shadow pl-3 pr-3 pb-4 pt-2 mb-3 mx-auto"
    >
      <Formik
        initialValues={{email, direction}}
        validationSchema={Yup.object({
          direction: Yup.string()
            .min(4, "Debe tener al menos 4 caracteres")
            .max(50, "Debe tener 50 caracteres o menos")
            .required("Debes completar este campo"),
          email: Yup.string()
            .email("Introduzca un email valido por favor")
            .required("Debes completar este campo"),
        })}
        // onSubmit={async (values, { setSubmitting, resetForm }) => {
        //   // Convertir imagen en base64
        //   const imgBase64 = await convertBase64(values.image);
        //   //Agregar img64 al obj producto
        //   let product = { ...values, image: imgBase64 };
        //   // Verificar tipo de accion enviada
        //   action === "post" && dispatch(addNewProduct(product));
        //   action === "put" &&
        //     dispatch(updateProduct(id, product, categoryProduct));
        //   // Resetear o no , el formulari dependiendo la accion
        //   if (action === "put") initialValuesForm = product;
        //   action === "post" && resetForm();
        //   setSubmitting(false);
        // }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Form>
              <Col className="rounded-lg text-center">

                  <Row>
                    <Button
                      className="btn btn-light text-secondary btn-sm float-left"
                      onClick={() => history.push("/cart")}
                    >
                      <ArrowLeftCircle size={30} />
                    </Button>
                  </Row>
              
                <Row className="d-block">
                  <BagCheck className="mb-1 mr-2" size={40} />
                  <h2>Confirma tu compra!</h2>
                </Row>
              </Col>
              <hr className="mt-0 mb-3" />
              <h6>El total de tu compra es </h6>
              <Row>
                <Col>
                  <CustomInput
                    label="Direccion"
                    name="direction"
                    type="text"
                    placeholder="Domicilio de envio"
                  />
                </Col>
                <Col>
                  <CustomInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder= "email de confirmacion"
                  />
                </Col>
              </Row>
              <Button
                block
                className="bg-color-primary shadow-primary rounded-pill border-0"
                type="submit"
              >
                {isSubmitting
                  ? "Cargando..."
                  //: action === "post"
                  //? "Compra confirmada"
                  : "Comprar"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Col>
  );
};

export default CheckoutForm;