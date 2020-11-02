import React, { useEffect, useState } from "react";
import "./userForm.css";
import { ArrowLeftCircle, PersonCircle } from "react-bootstrap-icons";
import { Button, Row, Col } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../custom/input";
import { useDispatch, useSelector } from "react-redux";
import { loguinUser } from "../../redux/actions/jwtUsers";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
  const session = useSelector((state) => state.session.userDetail);

  return (
    <>
      <Col
        lg="5"
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
            password: Yup.string().required("Debes ingresar una contraseña"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            //Request al backend
            let user = { ...values };

            //To lower case (wtf?)
            user.email = user.email.toLowerCase();

            dispatch(loguinUser(user.email, user.password)); //Funciona loguin correcto e error al ingresar mal los datos
            resetForm();
            setSubmitting(false);
            history.push("/");
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
                      placeholder="Introduzca su email"
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
      <Col lg={5} className="mx-auto">
        <Link className="float-left" to={"/forgotpassword"}>
          ¿Olvidó su contraseña?
        </Link>
        <Link className="float-right" to={"/user/register"}>
          Registrarse
        </Link>
      </Col>
    </>
  );
};

export default LoginForm;
