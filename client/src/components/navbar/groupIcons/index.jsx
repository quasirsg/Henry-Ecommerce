import React from "react";
import { Link } from "react-router-dom";
import {Cart3, Collection } from "react-bootstrap-icons";
import { Col, CustomInput } from "reactstrap";

//Components
import Guest from "../../guestOptions";

const groupIcons = () => {
  return (
    <Col lg="2" style={{ display: "flex", justifyContent: "space-between" }}>
      <Link to={"/products"} className="text-dark">
        <Collection size={20} />
      </Link>
      <Link to={"/cart"} className="text-dark">
        <Cart3 size={20} />
      </Link>

      <Guest/>

      <CustomInput
        className="pl-0 pt-1 text-dark"
        type="switch"
        id="exampleCustomCheckbox"
      />
    </Col>
  );
};

export default groupIcons;
