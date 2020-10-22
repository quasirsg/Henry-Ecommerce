import React from "react";
import { Col, Row } from "reactstrap";
import ItemCart from "./itemCart";

const ShoppingCart = ({ items }) => {
  return (
    <Col lg="12">
      <Row>
        {items.map((item) => {
          console.log(item);
          return (
            <ItemCart
              key={item.product.id}
              product={item.product}
              quantity={item.product.quantity}
            />
          );
        })}
      </Row>
    </Col>
  );
};

export default ShoppingCart;
