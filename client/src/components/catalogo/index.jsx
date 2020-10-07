import React from 'react';
import Category from '../categoria';
import ProductCard from '../ProductCard/ProductCard';
import { Container, Row, Col } from 'reactstrap';
import './Catalogo.css';

const Catalogue = (props) => {

    return (
        <Container className='catalogo' >
            <Row>
                <Col xs="3"><Category /></Col>
                <Col xs="9">
                    <ul>
                        <li>
                            <ProductCard className='productCard' />
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default Catalogue;