import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import GroupIcons from "./groupIcons";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navbar__link">
        <img src="/gym.png" width="40" height="40" alt="logo-icon"></img>
      </Link>
      <SearchBar />
      <GroupIcons />
    </div>
  );
};

export default Navbar;
