import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import GroupIcons from "./groupIcons";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <h3 style={{ color: "424242", margin: "0" }}>Grupo 12</h3>
      </Link>
      <SearchBar />
      <GroupIcons />
    </div>
  );
};

export default Navbar;
