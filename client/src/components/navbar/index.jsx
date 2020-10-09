import React from 'react'

import { Link } from 'react-router-dom'
import { Container, Col } from 'reactstrap'

import SearchBar from './SearchBar'
import GroupIcons from './groupIcons'

const Navbar = ({ }) => {
    return (
        <div className="navbar">
            <Link to="/">
                <h3 style={{ color: '424242', margin: '0' }}>Grupo 12</h3>
            </Link>
            <SearchBar />
            <GroupIcons />
        </div>
    );
}

export default Navbar;