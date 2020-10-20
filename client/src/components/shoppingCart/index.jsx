import React from "react";
import { Col, Row } from "reactstrap";
import ItemCart from "./itemCart";

const ShoppingCart = ({ items }) => {
  console.log(items);

  return (
    <Col lg="12">
      <h6>Item(s)</h6>
      <Row>
        {items.map((item) => {
          console.log(item);
          return <ItemCart product={item} quantity={item} />;
        })}
      </Row>
    </Col>
  );
};

export default ShoppingCart;
