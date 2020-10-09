import React, { useState } from 'react'
import { Search } from 'react-bootstrap-icons'
import { useHistory } from 'react-router-dom'
import { Button } from 'reactstrap'
import SearchPage from '../../../pages/SearchPage'

import './SearchBar.css'

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleOnChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const history = useHistory();

    const routeChange = () => {
        let path = `/search/q/${searchTerm}`;
        history.push(path);
        history.go(0);
    }

    return (
        <form
            className="searchBar__form"
            onSubmit={event => {
                event.preventDefault();
                console.log(event)
            }}
        >
            <input
                className="searchBar__input"
                type="text"
                name="search"
                onChange={handleOnChange}
                placeholder='Que estas buscando?'
            />
            <button
                onClick={routeChange}
                className="searchBar__button"
            >
                <Search />
            </button>
        </form>
    );
}

export default SearchBar;