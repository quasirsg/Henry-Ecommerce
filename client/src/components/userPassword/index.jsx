import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FormGroup, Row, Col, Toast } from "reactstrap";
import ButtonBlock from "../custom/ButtonBlock";
import { useDispatch, useSelector } from "react-redux";
import { passwordChange } from "../../redux/actions/jwtUsers";
const UserPassword = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.userDetail);

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Campo Requerido")
      .min(5, `Mínimo 5 caracteres`),
    newPassword: Yup.string()
      .required("Campo Requerido")
      .min(5, `Mínimo 5 caracteres`),
    confirmNewPassword: Yup.string()
      .required("Campo Requerido")
      .min(5, `Mínimo 5 caracteres`),
  });

  return (
    <>
      <Formik
        initialValues={{
          password: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          console.log(values);
          console.log(user.email);
          values.email = user.email;

          dispatch(passwordChange(user.id, values));
        }}
      >
        <Form>
          <FormGroup>
            <label htmlFor="Password">Contraseña Actual: </label>
            <Field
              className="form-control"
              name="password"
              placeholder=""
              type="password"
            />
            <ErrorMessage
              name="Password"
              component="div"
              className="field-error text-danger"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="newPassword">Nueva Contraseña: </label>
            <Field
              className="form-control"
              name="newPassword"
              placeholder=""
              type="password"
            />
            <ErrorMessage
              name="Password"
              component="div"
              className="field-error text-danger"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="confirmNewPassword">Confirmar Contraseña: </label>
            <Field
              className="form-control"
              name="confirmNewPassword"
              placeholder=""
              type="password"
            />
            <ErrorMessage
              name="Password"
              component="div"
              className="field-error text-danger"
            />
          </FormGroup>
          <Col lg={12} md={12}>
            <ButtonBlock children="Cambiar Contraseña" />
          </Col>
        </Form>
      </Formik>
    </>
  );
};

export default UserPassword;
