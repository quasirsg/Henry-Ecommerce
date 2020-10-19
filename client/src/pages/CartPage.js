import React from 'react'

import { Container, Col, Row } from 'reactstrap'
import ShoppingCart from '../components/shoppingCart'
import ButtonBlock from '../components/custom/ButtonBlock'
import { useSelector } from 'react-redux'
const Cart = () => {

    const productsCarts = useSelector(state => state.cart.products);
    return (
        <Container
            fluid={true}
            className="mt-4"
        >
            <Row>
                <Col lg="8">
                    <ShoppingCart
                        items={productsCarts}
                    />
                </Col>
                <Col lg="4">
                    DETALLES DEL CLIENTE , METODOS DE PAGO Y BOTON PARA PROCEDER AL CHECKOUT
                    <ButtonBlock
                        children={'Siguiente'}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;