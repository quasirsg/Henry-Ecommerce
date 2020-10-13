import React from "react";
import { Container, Col, Row } from 'reactstrap'

import CategoryItem from './categoriaItem'
import "./categoria.css";

const Category = ({ categorys }) => {
  return (
    <Col lg="2">
      <div className="categoria__title">
        Categorias
        </div>
      <Row>
        {categorys.map(item => <CategoryItem categoria={item} />)}
      </Row>
    </Col>
  );
};

export default Category;
