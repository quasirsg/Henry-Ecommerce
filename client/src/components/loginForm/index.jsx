import React, { useEffect, useState } from "react";
import "./userForm.css";
import { ArrowLeftCircle, PersonCircle } from "react-bootstrap-icons";
import { Button, Row, Col } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomInput from "../custom/input";
import { useDispatch } from "react-redux";
import { loguinUser } from "../../redux/actions/jwtUsers";
import { cartLoginListen } from "../custom/utils";
import { addProducts } from "../../redux/actions/userActions";
import Toast from '../alerts/toast'; 

const LoginForm = ({
  id,
  name = "",
  email = "",
  password = "",
  action,
  icon,
  message,
  history
}) => {
  const dispatch = useDispatch();

  return (
    <Col
      lg="6"
      sm="10"
      xs="10"
      className="card shadow pl-3 pr-3 pb-4 pt-2 mb-3 mt-4 mx-auto"
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
          let user = { ...values };

          const data = action === "delete" ? null : user;
          //To lower case
          user.email = user.email.toLowerCase();

          dispatch(loguinUser(user.email, user.password))
            .then((res) => {
              resetForm();
              setSubmitting(false);
              Toast.fire({
                icon: 'info',
                title: `¡Bienvenido de vuelta!`,
              });
              history.push('/');
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
        {({ isValid, isSubmitting }) => {
          return (
            <Form>
              <Col className="rounded-lg text-center">
                {action === "put" ? (
                  <Row>
                    <Button
                      className="btn btn-light text-secondary btn-sm float-left"
                      onClick={() => history.push("/user/login")}
                    >
                      <ArrowLeftCircle size={20} />
                    </Button>
                  </Row>
                ) : (
                  ""
                )}

                <Row className="d-block">
                  <PersonCircle className="mb-1 mr-2" size={40} />
                  <h2>Ingresar</h2>
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
                  ? "Iniciando sesón..."
                  : action === "put"
                  ? "Actualizar usuario"
                  : action === "delete"
                  ? "Eliminar usuario"
                  : action === "post"
                  ? "Ingresar"
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
