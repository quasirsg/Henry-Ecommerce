import React, { useState } from "react";
import "./userForm.css";
import { ClipboardPlus, ArrowLeftCircle } from "react-bootstrap-icons";
import { Button, Row, Col } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import CustomInput from "../custom/input";
import apiCall from "../../redux/api";
import { useDispatch } from "react-redux";

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import allActions from "../../redux/actions/allActions";

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

const FormUser = ({
  id,
  name = "",
  email = "",
  password = "",
  image = "",
  location_id = 1,
  rol = true,
  action,
  icon,
  message,
  history,
}) => {
  const dispatch = useDispatch();

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
          email,
          password,
          image,
          location_id,
          rol,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(4, "Debe tener al menos 4 caracteres")
            .max(50, "Debe tener 50 caracteres o menos")
            .required("Debes completar este campo"),
          email: Yup.string()
            .email("Introduzca un email valido por favor")
            .required("Debes completar este campo"),
          password: Yup.string()
            .required("Please Enter your password")
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
          img: Yup.string(),
          location_id: Yup.number()
            .min(1, "Debe ser mayor a 1")
            .required("Debes seleccionar una localidad"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          //Validar url
          const url = `/users/${id ? id : ""}`;
          // Convertir imagen en base64
          const imgBase64 = await convertBase64(values.image);
          //Request al backend
          let user = { ...values, image: imgBase64 };
          const data = action === "delete" ? null : user;

          // console.log(user);
          // apiCall(url, data, null, action);
          dispatch(allActions.editUser(id, action, user))
            .then((response) => {
              //Una vez agregado el producto , le asigna una categoria
              const id = response.data.id;

              resetForm();
              setSubmitting(false);
              Toast.fire({
                icon,
                title: `${message} ${values.name}`,
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
                      onClick={() => history.push("/admin/users")}
                    >
                      <ArrowLeftCircle size={20} />
                    </Button>
                  </Row>
                ) : (
                  ""
                )}

                <Row className="d-block">
                  <ClipboardPlus className="mb-1 mr-2" size={40} />
                  <h2>Registrarse</h2>
                </Row>
              </Col>
              <hr className="mt-0 mb-3" />
              <Row>
                <Col>
                  <CustomInput
                    label="Nombre"
                    name="name"
                    type="text"
                    placeholder="Introduzca su nombre"
                  />
                </Col>

                <Col>
                  <CustomInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Introzuca su email"
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Col lg="6" xs="6">
                    <CustomInput
                      label="Password"
                      name="password"
                      type="password"
                    />
                  </Col>
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
                  <CustomInput label="Rol" name="rol" value={true} />
                </Col>
                <Col>
                  <Row>
                    <Col lg="6" xs="6">
                      <CustomInput
                        label="Localización"
                        name="location_id"
                        type="number"
                      />
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
                  ? "Actualizar usuario"
                  : action === "delete"
                  ? "Eliminar usuario"
                  : action === "post"
                  ? "Agregar usuario"
                  : null}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Col>
  );
};

export default FormUser;
