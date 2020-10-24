import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { PersonSquare } from "react-bootstrap-icons";
const Guest = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} size="sm" toggle={toggle}>
      <DropdownToggle caret>Login</DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem>
          <Link to={"/user/login"} className="text-dark ">
            Login
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link to={"/user/register"} className="text-dark ">
            Register
          </Link>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <Link to={"/admin"} className="text-dark ">
            <PersonSquare size={20} />
          </Link>
        </DropdownItem>
        <DropdownItem>Bar Action</DropdownItem>
        <DropdownItem>Quo Action</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Guest;
