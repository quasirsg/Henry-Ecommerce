import React from "react";
import { Link } from "react-router-dom";
import { PersonSquare, Cart3, Collection } from "react-bootstrap-icons";
import { Col, CustomInput } from "reactstrap";

const groupIcons = () => {
  return (
    <Col lg="2" style={{ display: "flex", justifyContent: "space-between" }}>
      <Link to={"/products"} className="text-dark">
        <Collection size={20} />
      </Link>
      <Link to={"/"} className="text-dark">
        <Cart3 size={20} />
      </Link>
      <Link to={"/admin"} className="text-dark ">
        <PersonSquare size={20} />
      </Link>
      <CustomInput
        className="pl-0 pt-1 text-dark"
        type="switch"
        id="exampleCustomCheckbox"
      />
    </Col>
  );
};

export default groupIcons;
