import React from "react";
import { Container, Row } from 'reactstrap'
import { useSelector } from 'react-redux'
import Catalogo from '../components/catalogo';
import Categoria from '../components/categoria'

const SearchPage = () => {

  const categorias = useSelector(state => state.category.category);
  const searchResults = useSelector(state => state.search.results);

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
};

export default SearchPage;
