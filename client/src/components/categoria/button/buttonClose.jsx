import React, { useState } from "react";
import { Backspace } from "react-bootstrap-icons";
import "./closeButton.css";

const CloseButton = ({ handleMouseDown }) => {
  return (
    <div className="style" id="roundButton" onMouseDown={handleMouseDown}>
      <Backspace size={30} />
    </div>
  );
};

export default CloseButton;
