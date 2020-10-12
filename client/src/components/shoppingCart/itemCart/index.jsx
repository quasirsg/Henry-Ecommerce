import React from 'react'

import { Col, Row } from 'reactstrap'
import ButtonCircle from '../../custom/ButtonCircle'

import './itemCart.css'

const ItemCart = ({ product, quantity }) => {
    return (
        <Col lg="12">
            <div className="itemCart">
                <Row>
                    <Col lg="6">
                        <div className="row-flex">
                            <div className="itemCart__image">
                                <img src={product.image} className="img-fill" alt="" />
                            </div>
                            <div className="itemCart__content">
                                <div className="itemCart-title">{product.title}</div>
                                <div className="itemCart-subtitle">$ {product.price}</div>
                            </div>
                        </div>
                    </Col>
                    <Col lg="6">
                        <div className="d-flex flex-row-reverse">
                            <button className="itemCart-delete">
                                Remover
                            </button>
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <ButtonCircle
                                children={'+'}
                            />
                            <div className="itemCart-count">
                                {quantity}
                            </div>
                            <ButtonCircle
                                children={'-'}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}

export default ItemCart;