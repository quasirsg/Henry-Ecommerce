import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Cart3, Collection } from "react-bootstrap-icons";
import { Col, CustomInput, Badge } from "reactstrap";
//Components
import Guest from "../../guestOptions";
import { useSelector } from "react-redux";

export default () => {
  const cart = useSelector((state) => state.users.carrito);

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
      {count.length > 0 ? (
        <Badge href="#" color="danger">
          {count.length}
        </Badge>
      ) : null}

      <Guest />

      {/* <CustomInput
        className="pl-0 pt-1 text-dark"
        type="switch"
        id="exampleCustomCheckbox"
      /> */}
    </Col>
  );
};
