import React, { useEffect, useState } from "react";
import "./styles.css";
import { KeyFill, PersonCircle } from "react-bootstrap-icons";
import { Button, Row, Col } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../custom/input";
import { Link } from 'react-router-dom';
import Toast from '../alerts/toast';
import Swal from 'sweetalert2';
import axios from 'axios';

const ForgotPasswordForm = () => {
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
            email: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Introduzca un email valido por favor")
              .required("Debes completar este campo")
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const url = 'http://localhost:3001/users/auth/forgot-password';
            axios.put(url, values)
              .then(response => {
                resetForm();
                setSubmitting(false);
                Swal.fire({
                  position: "center",
                  icon: "success",
                  width: '700px',
                  title: `<h4>${response.data.message}</h4>`,
                  showConfirmButton: false,
                  timer: 2500,
                });
              })
              .catch(error => {
                setSubmitting(false);
                Toast.fire({
                  icon: 'error',
                  title: 'El email no se encuentra registrado.'
                });
              })
          }}
        >
          {({ isValid, isSubmitting }) => {
            return (
              <Form>
                <Col className="rounded-lg text-center">
                  <Row className="d-block">
                    <KeyFill className="mb-1 mr-2" size={40} />
                    <h2>Recuperar contraseña</h2>
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
                <Button
                  block
                  className="bg-color-primary shadow-primary rounded-pill border-0"
                  type="submit"
                  disabled={!isValid}
                >
                  {isSubmitting
                    ? "Enviando..."
                    : "Enviar correo electrónico"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Col>
      <Col lg={5} className='mx-auto'>
        <Link className='float-left' to={'/user/login'}>Iniciar sesión</Link>
        <Link className='float-right' to={'/user/register'}>Registrarse</Link>
      </Col>
    </>
  );
};

export default ForgotPasswordForm;
