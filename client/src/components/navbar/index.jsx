import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import GroupIcons from "./groupIcons";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <img src="/GymLogo.gif" width="80" height="80" alt="logo-icon"></img>
      </Link>
      <SearchBar />
      <GroupIcons />
    </div>
  );
};

export default Navbar;
