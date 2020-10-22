import React, { useEffect } from "react";
import { Container, Col, Row, Button } from "reactstrap";
import ShoppingCart from "../components/shoppingCart";
import ButtonBlock from "../components/custom/ButtonBlock";
import { useSelector, useDispatch } from "react-redux";
import { deleteAllCart, getProductCart } from "../redux/actions/userActions";
import { getOneProduct, getProducts } from "../redux/actions/productActions";
const Cart = () => {
  const prueba = useSelector((state) => state);
  const productsCarts = useSelector((state) => state.users.carrito);
  const dispatch = useDispatch();

  const userId = 1;
  const deleteAll = (e) => {
    e.preventDefault();
    dispatch(deleteAllCart(userId));
  };

  return (
    <Container fluid={true} className="mt-4">
      <Row>
        <Col lg="8">
          <ShoppingCart items={productsCarts} />
        </Col>
        <Col lg="4">
          <ButtonBlock children={"Siguiente"} />
          <Button children={"Eliminar Carrito"} onClick={deleteAll} />
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
