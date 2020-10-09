import React, { useState } from 'react'
import { Search } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

import './SearchBar.css'

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleOnChange = (event) => {
        setSearchTerm(event.target.value);
    }

    return (
        <form
            className="searchBar__form"
        >
            <input
                className="searchBar__input"
                type="text"
                name="search"
                onChange={handleOnChange}
                placeholder='Que estas buscando?'
            />
            <Link
                to={'/search/q/' + searchTerm}
                className="searchBar__button"
            >
                <Search />
            </Link>
        </form>
    );
}

export default SearchBar;