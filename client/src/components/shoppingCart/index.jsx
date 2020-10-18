import React from "react";
import { Col, Row } from "reactstrap";
import ItemCart from "./itemCart";

const ShoppingCart = ({ items }) => {

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
