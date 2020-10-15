import React from "react";
import { Col, Row } from 'reactstrap'
import { useDispatch } from 'react-redux'
import CategoryItem from './categoriaItem'
import "./categoria.css";

const Category = ({ categorys }) => {
  const dispatch = useDispatch();

  return (
    <Col lg="2">
      <div className="categoria__title">
        Categorias
        </div>
      <Row>
        {categorys.map(item =>
          <CategoryItem
            dispatch={dispatch}
            key={item.id}
            categoria={item}
          />
        )}
      </Row>
    </Col>
  );
};

export default Category;
