import React from 'react'

import { Person, Cart3, Toggle2On } from 'react-bootstrap-icons'
import { Col } from 'reactstrap'

const groupIcons = () => {
    return (
        <Col lg='2' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Person
                size={20}
            />
            <Cart3
                size={20}
            />
            <Toggle2On
                size={20}
            />
        </Col>
    );
}

export default groupIcons;