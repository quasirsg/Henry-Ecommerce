import React, { useState } from 'react'
import { Search } from 'react-bootstrap-icons'

import './SearchBar.css'

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleOnChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleOnSubmit = () => {
        //SearchTerm send
    }
    return (
        <form
            className="searchBar__form"
            onSubmit={handleOnSubmit}
        >
            <input
                className="searchBar__input"
                type="text"
                name="search"
                onChange={handleOnChange}
                placeholder='Que estas buscando?'
            />
            <button
                className="searchBar__button"
                type="submit"
            >
                <Search />
            </button>
        </form>
    );
}

export default SearchBar;