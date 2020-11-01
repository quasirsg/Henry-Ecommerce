import React, { useState } from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody, Button, Collapse, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

import './order.css';

const Order = ({ products, userId, status, hasReviews }) => {

    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);

    const changeRating = (newRating, name) => setRating({ rating: newRating });
    const toggleButton = () => setIsOpen(!isOpen);
    const toggle = () => setModal(!modal);

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

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
                                <Col lg="12" className="d-flex-justify-content-center">
                                    <StarRatings
                                        rating={rating}
                                        starRatedColor="blue"
                                        changeRating={() => changeRating}
                                        starHoverColor="yellow"
                                        starDimension="20px"
                                        numberOfStars={5}
                                        name="rating"
                                    />
                                    <FormGroup>
                                        <Label for="exampleText">Cuentanos mas del producto</Label>
                                        <Input type="textarea" name="text" id="exampleText" />
                                    </FormGroup>
                                </Col>
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