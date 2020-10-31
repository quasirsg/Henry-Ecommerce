import React from "react";
import { Col, Row } from "reactstrap";
import ItemCart from "./itemCart";

const ShoppingCart = ({ items, userId }) => {
  return (
    <Col lg="12">
      <Row>
        {typeof items[0] !== "undefined" &&
          items.map((item) => {
            return <ItemCart key={item.id} product={item} userId={userId} />;
          })}
      </Row>
    </Col>
  );
};

export default ShoppingCart;
