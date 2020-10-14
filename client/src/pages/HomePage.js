import React, { useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import Categoria from '../components/categoria';
import Catalogo from '../components/catalogo';
import { useSelector, useDispatch } from 'react-redux';
import { getCategory } from '../redux/actions/categoryActions';
import { getProducts } from '../redux/actions/productActions';
const HomePage = () => {

    const dispatch = useDispatch();
    const categorias = useSelector(state => state.category.category);
    const productos = useSelector(state => state.products.products);

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getProducts());
    }, [])

    return (
        <Container fluid={true} className="mt-4">
            <Row>
                <Categoria
                    categorys={categorias}
                />
                <Catalogo
                    products={productos}
                />
            </Row>
        </Container>
    );
}

export default HomePage;