import React from 'react'
import { Col, Row } from 'reactstrap'
import { Files } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import './categoryItem.css'

const categoriaItem = ({ categoria }) => {
    return (
        <Link
            to={`/search/category/${categoria.id}`}
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