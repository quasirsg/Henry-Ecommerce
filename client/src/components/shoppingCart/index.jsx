import React from "react";
import { Col, Row } from "reactstrap";
import ItemCart from "./itemCart";
import { useSelector } from "react-redux";

const ShoppingCart = ({ items = [] }) => {
  const store = useSelector((state) => console.log(state));
  return (
    <Col lg="12">
      <h6>Item(s)</h6>
      <Row>
        {items.map((item) => (
          <ItemCart product={item.product} quantity={item.quantity} />
        ))}
      </Row>
    </Col>
  );
};

export default ShoppingCart;
