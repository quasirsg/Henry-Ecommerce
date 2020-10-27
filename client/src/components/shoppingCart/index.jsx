import React from "react";
import { Col, Row } from "reactstrap";
import ItemCart from "./itemCart";

const ShoppingCart = ({ items }) => {
  console.log(items);
  return (
    <Col lg="12">
      <Row>
        {items.map((item) => {
          return <ItemCart key={item.id} product={item} />;
        })}
      </Row>
    </Col>
  );
};

export default ShoppingCart;
