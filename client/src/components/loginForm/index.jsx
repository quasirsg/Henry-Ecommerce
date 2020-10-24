import React from "react";
import "./userForm.css";
import { ClipboardPlus, ArrowLeftCircle } from "react-bootstrap-icons";
import { Button, Row, Col } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import CustomInput from "../custom/input";

import { useDispatch } from "react-redux";


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

const LoginForm = ({
  id,
  name = "",
  email = "",
  password = "",
  action,
  icon,
  message,
  history,
}) => {
  const dispatch = useDispatch();

  return (
    <Col
      lg="6"
      sm="10"
      xs="10"
      className="card shadow pl-3 pr-3 pb-4 pt-2 mb-3 mx-auto"
    >
      <Formik
        initialValues={{
          email,
          password,
        }}
        validationSchema={Yup.object({

          email: Yup.string()
            .email("Introduzca un email valido por favor")
            .required("Debes completar este campo"),
          password: Yup.string()
            .required("Please Enter your password")
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
        })}
        
        onSubmit={async (values, { setSubmitting, resetForm }) => {

          //Request al backend
          let user = { ...values,};

          const data = action === "delete" ? null : user;
          //To lower case
          user.email = user.email.toLowerCase();

          dispatch(allActions.editUser(id, action, user))
            .then((res) => {
              // console.log(res);
              resetForm();
              setSubmitting(false);
              Toast.fire({
                icon,
                title: `${message} Bienvenido ${values.name}`,
              });
              setTimeout(function(){ window.location.href = "/"; }, 3000);
            })
            .catch((error) => {
              console.log(error);
              setSubmitting(false);
              Toast.fire({
                icon: "error",
                title: "Error: vuelve a intentarlo",
              });
            });
        }}
      >
        {({ isValid,isSubmitting }) => {
          return (
            <Form>
              <Col className="rounded-lg text-center">
                {action === "put" ? (
                  <Row>
                    <Button
                      className="btn btn-light text-secondary btn-sm float-left"
                      onClick={() => history.push("/user/register")}
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
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Introzuca su email"
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <CustomInput
                    label="Password"
                    name="password"
                    type="password"
                  />
                </Col>
              </Row>              
              <Button
                block
                className="bg-color-primary shadow-primary rounded-pill border-0"
                type="submit"
                disabled={!isValid}
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

export default LoginForm;
