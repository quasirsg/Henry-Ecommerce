import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import CustomInput from "../custom/input";
import ButtonBlock from '../custom/ButtonBlock';
import { useDispatch, useSelector } from "react-redux";
import { editUser } from '../../redux/actions/userActions';

import './userDetail.css';

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

const UserDetail = () => {
    const dispatch = useDispatch();
    const { id, name, email, address, phoneNumber } = useSelector(state => state.session.userDetail);
    return (
        <Formik
            initialValues={{
                name,
                email,
                address,
                phoneNumber: phoneNumber === null ? '' : phoneNumber,
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(4, "Debe tener al menos 4 caracteres")
                    .max(50, "Debe tener 50 caracteres o menos")
                    .required("Debes completar este campo"),
                email: Yup.string()
                    .email("Introduzca un email valido por favor")
                    .required("Debes completar este campo"),
                address: Yup.string()
                    .min(6, "Debe tener al menos 4 caracteres")
                    .max(50, "Debe tener 50 caracteres o menos")
                    .required("Debes completar este campo"),
                phoneNumber: Yup.string()
                    .matches(
                        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                        "Phone number is not valid"
                    ),
            })}
            onSubmit={values => {
                dispatch(editUser(id, values, localStorage.token));
                Toast.fire({
                    icon: 'success',
                    title: 'Ha modificado su cuenta con exito!',
                });
                setTimeout(function () {
                    window.location.href = "/";
                }, 1000);
            }}
        >
            <Form>
                <Col>
                    <h2 style={{ fontWeight: 'bold', color: '#424242', marginBottom: '2rem' }}>Mis Datos Personales!</h2>
                </Col>
                <Container fluid={true}>
                    <Row
                        lg="2"
                    >
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
                        <Col lg="6" xs="6">
                            <CustomInput
                                label="Dirección"
                                name="address"
                                type="text"
                            />
                        </Col>
                        <Col lg="6" xs="6">
                            <CustomInput
                                label="Numero de teléfono"
                                name="phoneNumber"
                                type="text"
                            />
                        </Col>
                        <Col
                            lg="12 d-flex justify-content-center pt-5"
                        >
                            <div className="userDetail__buttons">
                                <ButtonBlock style={{ margin: '1rem' }}>Actualizar Datos</ButtonBlock>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </Formik>
    );
};

export default UserDetail;
