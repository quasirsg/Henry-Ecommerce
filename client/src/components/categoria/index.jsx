import React, { useState } from "react";
import CloseButton from "./button/buttonClose.jsx";
import "./categoria.css";

const Category = ({ category, handleMouseDown, menuVisibility }) => {
  const [show, setShow] = useState(false);
  let visibility = "hide";

  const toggleMenu = () => {
    setShow(true);
  };

  const handleClose = (e) => {
    toggleMenu();
    e.stopPropagation();
    setShow(false);
  };

  if (menuVisibility && show === false) {
    visibility = "show";
  } else {
    visibility = "hide";
  }

  return (
    <div
      id="flyoutMenu"
      onMouseDown={() => handleMouseDown}
      className={visibility}
    >
      <div className="closeB" onClick={handleClose}>
        <CloseButton handleMouseDown={handleMouseDown} />
      </div>
      <aside className="aside">
        <h2>Categorias</h2>
        <ul>
          {category.map((cat, i) => {
            return (
              <li key={cat.id}>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={cat.id}
                  />
                  <label className="custom-control-label" htmlFor={cat.id}>
                    {cat.name}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="button-cont ">
          <button className="button">Mostrar Todos</button>
        </div>
      </aside>
    </div>
  );
};

export default Category;
