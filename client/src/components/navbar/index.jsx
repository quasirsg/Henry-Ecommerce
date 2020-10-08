import React from 'react'

import { Link } from 'react-router-dom'
import { Container, Col } from 'reactstrap'

import SearchBar from '../searchBar'
import GroupIcons from '../groupIcons'

const Navbar = ({ }) => {
    return (
        <Container>
            <Col lg='12'>
                <Link to="/">
                    <h3>Grupo 12</h3>
                </Link>
                <SearchBar />
                <GroupIcons />
            </Col>
        </Container>
    );
}

export default Navbar;