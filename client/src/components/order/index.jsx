import React, { useState } from 'react';
import { Form, Col, Row, Modal, ModalHeader, ModalBody, Button, Collapse, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import StarRatingComponent from 'react-star-rating-component';
import { useDispatch } from 'react-redux';
import { addReview } from '../../redux/actions/userActions';

import './order.css';


const Order = ({ products, status, hasReviews }) => {

    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [textReview, setTextReview] = useState('');

    const toggleButton = () => setIsOpen(!isOpen);
    const toggle = () => setModal(!modal);
    const handleOnChange = event => setTextReview(event.target.value);
    const hanldeOnSubmit = event => {
        dispatch(addReview(products[0].id, products[0].linea_order.userId, rating, textReview));
        Toast.fire({
            icon: 'success',
            title: 'Ha Añadido una review!',
        });
        setTimeout(function () {
            window.location.href = "/user/account";
        }, 1000);
        event.preventDefault();
    }
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
    const availableReviews = () => {
        if (status === 'completed') {
            if (hasReviews.length === []) {
                return true
            } else {
                hasReviews.map(review => {
                    products.map(product => {
                        if (product.id === review.productId) return false;
                    })
                })
            }
            return true;
        } else {
            return false;
        }
    }
    const onStarClick = (nextValue, prevValue, name) => {
        setRating(nextValue);
    }

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

    return (
        <Col lg="12">
            <div className="order__card">
                <div className="order__status">
                    {
                        {
                            'completed': <Button color="success">Completado</Button>,
                            'processing': <Button color="primary">Procesando</Button>,
                            'canceled': <Button color="danger">Cancelado</Button>
                        }[status]
                    }

                </div>
                <div className="order__content">
                    {Array.isArray(products)
                        ?
                        <>
                            {products.length > 1
                                ?
                                < div className="order__images">
                                    {products.map(product =>
                                        <div className="order__img">
                                            <img className="order__image" src={product.image} alt={product.title} />
                                        </div>
                                    )}
                                </div>
                                :
                                <Row>
                                    <Col lg="4">
                                        <div className="order__images">
                                            <div className="order__img">
                                                <img className="order__image" src={products[0].image} alt={products[0].name} />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="8" className="my-auto">
                                        <div className="order__title">
                                            {products[0].name}
                                        </div>
                                        <div className="order__cuantity">
                                            {products[0].linea_order.quantity > 1
                                                ? '$ ' + products[0].price + ' x' + products[0].linea_order.quantity + ' unidades'
                                                : '$ ' + products[0].price + ' x' + products[0].linea_order.quantity + ' unidad'
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            }
                            <div className="order__buttons">
                                <Button color="info" onClick={toggle}>Ver detalle</Button>
                                {availableReviews()
                                    ? <Button color="warning" style={{ margin: '0 10px' }} onClick={toggleButton} >Opinar sobre el producto</Button>
                                    : <Button color="secondary" style={{ margin: '0 10px' }}>Review Recibida</Button>
                                }
                            </div>
                            <Collapse isOpen={isOpen}>
                                <Form onSubmit={hanldeOnSubmit}>
                                    <Col lg="12">
                                        <div className="d-flex justify-content-center mt-2">
                                            <StarRatingComponent
                                                name="rate1"
                                                starCount={5}
                                                emptyStarColor={'#ccc9c9'}
                                                value={rating}
                                                onStarClick={onStarClick}
                                            />
                                        </div>
                                        <FormGroup>
                                            <Label for="exampleText">Cuentanos mas acerca del producto</Label>
                                            <Input
                                                onChange={handleOnChange}
                                                type="textarea"
                                                name="text"
                                                id="exampleText" />
                                        </FormGroup>
                                        <Button type="submit" color="primary" style={{ marginBottom: '2rem' }}>Enviar Opinion</Button>
                                    </Col>
                                </Form>
                            </Collapse>
                            <Modal isOpen={modal} toggle={toggle} className="order__modal">
                                <ModalHeader toggle={toggle} close={closeBtn}>Productos Comprados</ModalHeader>
                                <ModalBody>
                                    {products.map(product =>
                                        <Order
                                            key={product.id}
                                            products={product}
                                            status={status}
                                        />
                                    )}
                                </ModalBody>
                            </Modal>
                        </>
                        :
                        <Col lg="12">
                            <Row>
                                <Col lg="4">
                                    <div className="order__images">
                                        <div className="order__img">
                                            <img className="order__image" src={products.image} alt={products.name} />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="8">
                                    <div className="order__title">
                                        {products.name}
                                    </div>
                                    <div className="order__cuantity">
                                        {products.linea_order.quantity > 1
                                            ? '$ ' + products.price + ' x' + products.linea_order.quantity + ' unidades'
                                            : '$ ' + products.price + ' x' + products.linea_order.quantity + ' unidad'
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    }
                </div>
            </div>
        </Col >
    );
}

export default Order;