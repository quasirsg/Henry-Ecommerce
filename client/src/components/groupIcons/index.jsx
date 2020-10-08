import React from 'react'

import { Person, Cart3 } from 'react-bootstrap-icons'
import { Col } from 'reactstrap'

const groupIcons = ({ }) => {
    return (
        <Col lg='3'>
            <Person />
            <Cart3 />
        </Col>
    );
}

export default groupIcons;