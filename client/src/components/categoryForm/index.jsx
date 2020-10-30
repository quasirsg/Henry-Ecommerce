import React from "react";
import "./categories.css";
import { Button, Row, Col, Container } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import CustomInput from "../custom/input";
import { useDispatch } from "react-redux";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { editCategory } from "../../redux/actions/categoryActions";

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

const FormCategory = ({
  id,
  name = "",
  description = "",
  action,
  icon,
  message,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="categoryForm">
      <Formik
        initialValues={{ name, description }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(4, "Debe tener al menos 4 caracteres")
            .max(40, "Debe tener 40 caracteres o menos")
            .required("Debes completar este campo"),

          description: Yup.string()
            .min(4, "Debe tener al menos 4 caracteres")
            .max(500, "Debe tener 400 caracteres o menos")
            .required("Debes completar este campo"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          

          dispatch(editCategory(id, action, values)).then((response) => {
            resetForm();
            setSubmitting(false);
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="categoryForm__form">
            <Row>
              <Button
                className="btn btn-light text-secondary btn-sm float-left"
                onClick={() => history.push("/admin/categories")}
              >
                <ArrowLeftCircle size={20} />
              </Button>
            </Row>
            <Container className="my-5 d-flex justify-content-center">
              <h2 className="text-center">Categorias</h2>
            </Container>
            <hr className="mt-0 mb-3" />

            <Row className="mt-5">
              <Col>
                <CustomInput
                  label="Nombre"
                  name="name"
                  type="text"
                  placeholder="Nombre de categoria"
                />
              </Col>
              <Col>
                <CustomInput
                  label="Descripcion"
                  name="description"
                  type="text"
                />
              </Col>
            </Row>

            <Button
              block
              className="bg-color-primary shadow-primary rounded-pill border-0 mt-5"
              type="submit"
            >
              {isSubmitting
                ? "Cargando..."
                : action === "put"
                ? "Actualizar categoria"
                : action === "delete"
                ? "Eliminar categoria"
                : action === "post"
                ? "Agregar categoria"
                : null}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormCategory;
