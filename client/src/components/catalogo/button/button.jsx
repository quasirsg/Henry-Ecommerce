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
      class={icon}
      id="roundButton"
      onMouseDown={handleMouseDown}
      onClick={(e) => handleIcon(e)}
    >
      <div class="hamburger-inner"></div>
    </div>
  );
};

export default MenuButton;
