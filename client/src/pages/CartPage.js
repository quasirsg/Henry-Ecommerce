import React, { useState } from "react";
import { Container, Col, Row, Button } from "reactstrap";
import ShoppingCart from "../components/shoppingCart";
import ButtonBlock from "../components/custom/ButtonBlock";
import { useSelector, useDispatch } from "react-redux";
import { deleteAllCart } from "../redux/actions/userActions";

const Cart = () => {
  const prueba = useSelector((state) => state);
  let productsCarts = useSelector((state) => state.users.carrito);
  const dispatch = useDispatch();

  const userId = 1; //?? loguin o guest

  const deleteAll = (e) => {
    e.preventDefault();
    dispatch(deleteAllCart(userId));
  };

  // Verificar que exista una sesion
  if (!localStorage.token) {
    if (localStorage.cart) {
      productsCarts = JSON.parse(localStorage.getItem("cart"));
    } else {
      productsCarts = [];
    }
  } else {
    if (localStorage.cart) {
      // productsCarts = JSON.parse(localStorage.getItem("cart"));
    }
  }

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
