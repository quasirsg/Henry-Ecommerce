import React, { useState } from "react";
import "./menuButton.css";

const MenuButton = ({ handleMouseDown }) => {
  const [icon, setIcon] = useState("hamburger");

  const handleIcon = (e) => {
    if (e) {
      setIcon("hamburger open");
    }
  };
  //TODO: Modificar css: cambio de imagen al hacer clic
  return (
    <div
      className={icon}
      id="roundButton"
      onMouseDown={handleMouseDown}
      onClick={(e) => handleIcon(e)}
    >
      <div className="hamburger-inner"></div>
    </div>
  );
};

export default MenuButton;
