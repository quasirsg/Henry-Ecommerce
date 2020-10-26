import React from "react";
import { ClipboardPlus, ArrowLeftCircle } from "react-bootstrap-icons";
import { Container, Button, Row, Col } from "reactstrap";
import { Formik, Form } from "formik";
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

const FormUser = ({
    id,
    name = "Bryan",
    email = "clientes.g4a",
    address = "avenida siempre viva-123",
    phoneNumber = "",
    password = "",
    image,
    location_id = 1,
    passwordConfirmation = "",
    action,
    icon,
    message,
    history,
}) => {
    const dispatch = useDispatch();

    // const convertBase64 = (file) => {
    //     if (typeof file === "string") return file;
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);

    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };

    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };

    return (

        <Formik
            initialValues={{
                name,
                email,
                address,
                phoneNumber,
                password,
                image,
                passwordConfirmation,
                location_id,
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
                    .required("Please Enter your Phone Number")
                    .matches(
                        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                        "Phone number is not valid"
                    ),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                // await dispatch(allActions.editUser(id, action, user))
                //     .then((res) => {
                //         resetForm();
                //         setSubmitting(false);
                //         Toast.fire({
                //             icon,
                //             title: `${message} Bienvenido ${values.name}`,
                //         });
                //         setTimeout(function () {
                //             window.location.href = "/";
                //         }, 3000);
                //     })
                //     .catch((error) => {
                //         console.log(error);
                //         setSubmitting(false);
                //         Toast.fire({
                //             icon: "error",
                //             title: "Error: vuelve a intentarlo",
                //         });
                //     });
            }}
        >
            {({ isValid, isSubmitting, setFieldValue }) => {
                return (
                    <Form>
                        <div className="userDetail__title">

                        </div>
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
                                        label="Password"
                                        name="password"
                                        type="password"
                                    />
                                </Col>

                                <Col lg="6" xs="6">
                                    <CustomInput
                                        label="Confirm Password"
                                        name="passwordConfirmation"
                                        type="password"
                                    />
                                </Col>

                                <Col lg="6" xs="6">
                                    <CustomInput label="Dirección" name="address" type="text" />
                                </Col>

                                <Col lg="6" xs="6">
                                    <CustomInput
                                        label="Numero de teléfono"
                                        name="phoneNumber"
                                        type="text"
                                    />
                                </Col>

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
                            </Row>
                        </Container>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormUser;
