import React from 'react';
import './product.css';
import { Button, Row, Col } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import CustomInput from '../custom/input';
import apiCall from '../../redux/api';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

const FormProduct = ({ id, name = '', stock = 0, description = '', price = 0, category = '', image = '', action, icon, message }) => {
  return (
    <Col lg='6' sm='10' xs='10' className='card shadow pl-3 pr-3 pb-4 pt-2 mt-3 mb-3 mx-auto'>
      <Formik
        initialValues={{
          name,
          stock,
          description,
          price,
          category,
          image
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(4, 'Debe tener al menos 4 caracteres')
            .max(50, 'Debe tener 50 caracteres o menos')
            .required('Debes completar este campo'),
          stock: Yup.number()
            .min(1, 'Debe tener al menos un producto en stock')
            .max(1000, 'Debe tener 1000 productos o menos')
            .required('Debes completar este campo'),
          description: Yup.string()
            .min(10, 'Debe tener al menos 10 caracteres')
            .max(500, 'Debe tener 400 caracteres o menos')
            .required('Debes completar este campo'),
          price: Yup.number()
            .min(1, 'Debe tener un precio mayor a $1')
            .required('Debes completar este campo'),
          category: Yup.string()
            .oneOf(['Hombre', 'Mujer', 'Niños'], 'Categoría invalida') //Las categorias debe traerlas de la bd
            .required('Debes seleccionar una categoría'),
          image: Yup.string()
            .required('Debes completar este campo')
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          //Validar url
          const url = `/products/${id ? id : ''}`;
          const data = action === 'delete' ? null : values;

          //Request al backend
          apiCall(url, data, null, action)
            .then(response => {
              resetForm();
              setSubmitting(false);
              Toast.fire({
                icon,
                title: `${message} ${values.name}`
              });
            })
            .catch(error => {
              setSubmitting(false);
              Toast.fire({
                icon: 'error',
                title: 'Error: vuelve a intentarlo'
              });
            })

        }}
      >

        {({ isSubmitting }) => (
          <Form>
            <Col className='rounded-lg text-center'>
              <img className='icon-litle-width' src='../gym.png' />
              <h2>Productos</h2>
            </Col>
            <hr className='mt-0 mb-3' />
            <Row>
              <Col>
                <CustomInput label='Nombre' name='name' type='text' placeholder='Remera deportiva' />
              </Col>
              <Col>
                <CustomInput label='Categoría' name='category' type='select' >
                  <option value=''>Seleccionar categoría</option>
                  <option value='Hombre'>Hombre</option>
                  <option value='Mujer'>Mujer</option>
                  <option value='Niños'>Niño</option>
                </CustomInput>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col lg='6' xs='6'>
                    <CustomInput label='Stock' name='stock' type='number' />
                  </Col>
                  <Col xs='6'>
                    <CustomInput label='Precio' name='price' type='number' />
                  </Col>
                </Row>
              </Col>
              <Col xs='12' lg='6'>
                <CustomInput label='Imagen' name='image' type='text' placeholder='Url' />
              </Col>
            </Row>
            <Row>
              <Col>
                <CustomInput label='Descripción' name='description' type='textarea' placeholder='Una remera deportiva nueva' />
              </Col>
            </Row>
            <Button block className='bg-color-primary shadow-primary rounded-pill border-0' type='submit'>
              {isSubmitting ? 'Cargando...' :
                action === 'put' ? 'Actualizar producto' :
                  action === 'delete' ? 'Eliminar producto' :
                    action === 'post' ? 'Agregar producto' : null}
            </Button>
          </Form>
        )}

      </Formik>
    </Col>
  )
}

export default FormProduct;
