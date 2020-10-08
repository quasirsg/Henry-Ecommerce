import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import FormProduct from './components/product'

function App() {
  const product = {
    name: 'Zapatillas',
    stock: 20,
    description: 'Nuevas zapatillas que generaron una revolucion en los jovenes de hoy en dia y no se que mas poner',
    price: 50,
    category: 'Hombre',
    enter_date: '2020-10-10',
    image: 'localhost:3000'
  }

  return (
    <Container>
      <Row>
        <Col lg='8' md='10' sm='12' xs='12' className='mx-auto'>
          <FormProduct {...product} action='put' icon='warning' message='Se actualizó producto:' />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
