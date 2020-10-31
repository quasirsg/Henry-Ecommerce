import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Cart3, Collection, PersonSquare } from "react-bootstrap-icons";
import { Col, CustomInput, Badge } from "reactstrap";
//Components
import Guest from "../../guestOptions";
import { getCurrentUser, logoutUser } from "../../../redux/actions/jwtUsers";

export default ({ history }) => {
  let cart = useSelector((state) => state.users.carrito);
  const notification = useSelector((state) => state.users.message);
  const dispatch = useDispatch();

  if (!localStorage.token) {
    if (localStorage.cart) {
      cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      cart = [];
    }
  }

  const handleClose = (e) => {
    dispatch(logoutUser());
  };

  let userRole = useSelector((state) => state.session.userDetail.role);

  console.log(userRole);

  const linkUser = (userRole) => {
    if (userRole === "client") {
      return (
        <>
          <Link to={"/user/account"} className="text-dark ">
            <PersonSquare size={20} />
          </Link>
          <Link to={"/"} className="text-dark " onClick={handleClose}>
            Salir
          </Link>
        </>
      );
    } else if (userRole === "admin") {
      return (
        <>
          <Link to="/" className="text-dark " onClick={handleClose}>
            Salir
          </Link>

          <Link to={"/user/account"} className="text-dark ">
            <PersonSquare size={20} />
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to={"/user/login"} className="text-dark ">
            Ingresá
          </Link>
          <Link to={"/user/register"} className="text-dark ">
            Crea tu cuenta
          </Link>
        </>
      );
    }
  };

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
      {linkUser(userRole)}

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
