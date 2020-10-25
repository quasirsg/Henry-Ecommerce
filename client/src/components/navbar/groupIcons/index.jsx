import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Cart3, Collection } from "react-bootstrap-icons";
import { Col, CustomInput, Badge } from "reactstrap";
import { PersonSquare } from "react-bootstrap-icons";

//Components
import Guest from "../../guestOptions";

export default () => {
  let cart = useSelector((state) => state.users.carrito);
  const notification = useSelector((state) => state.users.message);

  if (!localStorage.token) {
    if (localStorage.cart) {
      cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      cart = [];
    }
  }

  return (
    <Col lg="3" style={{ display: "flex", justifyContent: "space-between" }}>
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
      <Link to={"/user/login"} className="text-dark ">
        Ingresá
      </Link>
      <Link to={"/user/register"} className="text-dark ">
        Crea tu cuenta
      </Link>
      <Link to={"/"} className="text-dark ">
        Salir
      </Link>
      <Link to={"/admin"} className="text-dark ">
        <PersonSquare size={20} />
      </Link>

      {/* <Guest/> */}

      {/* <CustomInput
        className="pl-0 pt-1 text-dark"
        type="switch"
        id="exampleCustomCheckbox"
        onClick={changeStyle}
      /> */}
    </Col>
  );
};
