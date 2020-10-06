import React from 'react'

import { Button, Container, Row, Col } from 'reactstrap'

const ProductDetail = ({ }) => {
    return (
        <div>
            <Button outline color="primary">primary</Button>{' '}
            <Button outline color="secondary">secondary</Button>{' '}
            <Button outline color="success">success</Button>{' '}
            <Button outline color="info">info</Button>{' '}
            <Button outline color="warning">warning</Button>{' '}
            <Button outline color="danger">danger</Button>
        </div>
    );
}

export default ProductDetail;