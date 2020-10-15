import React from "react";
import { Container, Row, Col } from 'reactstrap'
import { useSelector } from 'react-redux'
import Catalogo from '../components/catalogo';
import Categoria from '../components/categoria'

const SearchPage = () => {

  const categorias = useSelector(state => state.category.category);
  const searchResults = useSelector(state => state.search.results);

  if (searchResults.length === 0) {
    return (
      <Container fluid={true} className="mt-4">
        <Row>
          <Categoria
            categorys={categorias}
          />
          <Col lg="10">
            Lo sentimos no pudimos encontrar lo que buscas
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container fluid={true}>
        <Row>
          <Categoria
            categorys={categorias}
          />
          <Catalogo
            products={searchResults}
          />
        </Row>
      </Container>
    );
  }
};

export default SearchPage;
