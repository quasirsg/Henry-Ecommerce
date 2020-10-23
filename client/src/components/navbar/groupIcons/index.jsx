import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Cart3, Collection } from "react-bootstrap-icons";
import { Col, Badge, CustomInput } from "reactstrap";
//Components
import Guest from "../../guestOptions";

export default () => {
  let cart = useSelector((state) => state.users.carrito);
  const notification = useSelector((state) => state.users.message);

  if (localStorage.cart) {
    cart = JSON.parse(localStorage.getItem("cart"));
  } else {
    cart = [];
  }

  return (
    <Col lg="2" style={{ display: "flex", justifyContent: "space-between" }}>
      <Link to={"/products"} className="text-dark">
        <Collection size={20} />
      </Link>
      <Link to={"/cart"} className="text-dark">
        <Cart3 size={20} />
        {cart.length > 0 && (
          <Badge
            color="danger"
            style={{ paddingTop: "2px", paddingBottom: "2px" }}
            className="rounded-pill"
            size={5}
          >
            {" "}
            {cart.length}{" "}
          </Badge>
        )}
      </Link>

      <Guest />

      {/* <CustomInput
        className="pl-0 pt-1 text-dark"
        type="switch"
        id="exampleCustomCheckbox"
        onClick={changeStyle}
      /> */}
    </Col>
  );
};
