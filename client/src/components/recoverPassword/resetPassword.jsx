import React, { useEffect, useState } from "react";
import "./styles.css";
import { KeyFill } from "react-bootstrap-icons";
import { Button, Row, Col } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../custom/input";
import { useParams, useHistory } from 'react-router-dom';
import Toast from '../alerts/toast';
import Swal from 'sweetalert2';
import axios from 'axios';

const ResetPasswordForm = () => {
  const { token } = useParams();
  const history = useHistory();

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
            newPassword: '',
          }}
          validationSchema={Yup.object({
            newPassword: Yup.string()
              .min(5, "Introduzca una contraseña valida")
              .required("Debes completar este campo")
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const url = 'http://localhost:3001/users/auth/reset-password';
            console.log('Token: ', token);
            console.log('password: ', values)
            const data = { ...values, resetLink: token };
            axios.put(url, data)
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
                history.push('/user/login');
              })
              .catch(error => {
                setSubmitting(false);
                Toast.fire({
                  icon: 'error',
                  title: 'Error: vuelve a intentarlo.'
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
                    <h2>Nueva contraseña</h2>
                  </Row>
                </Col>
                <hr className="mt-0 mb-3" />
                <Row>
                  <Col>
                    <CustomInput
                      label="Nueva contraseña"
                      name="newPassword"
                      type="password"
                      placeholder="Introduzca su nueva contraseña"
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
                    ? "Guardando..."
                    : "Guardar"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Col>
    </>
  );
};

export default ResetPasswordForm;