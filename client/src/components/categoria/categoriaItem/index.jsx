import React from 'react'
import { Files } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { searchByCategory } from '../../../redux/actions/searchActions'
import './categoryItem.css'


const categoriaItem = ({ categoria, dispatch }) => {

    const handleOnClick = () => {
        dispatch(searchByCategory(categoria.name));
    }

    return (
        <Link
            to={`/search/category/${categoria.id}`}
            onClick={handleOnClick}
            className="categoryItem"
        >
            <div className="d-flex flex-row">
                <div className="categoryItem__icon">
                    <Files
                        size={20}
                    />
                </div>
                <div
                    className="categoryItem__link"
                >
                    {categoria.name}
                </div>
            </div>
        </Link>
    );
}

export default categoriaItem;