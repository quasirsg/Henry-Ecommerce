import React, { useState } from "react";
import Category from "../categoria";
import ProductCard from "../productCard/ProductCard";

import "./catalogo.css";
import MenuButton from "./button/button.jsx";
import { motion } from "framer-motion";

const Catalogue = ({ products, category }) => {
  const [drop, setDrop] = useState(false);

  const toggleMenu = () => {
    setDrop(!drop);
  };

  const handleMouseDown = (e) => {
    toggleMenu();
    e.stopPropagation();
  };

  return (
    <div className="container-ppal">
      <MenuButton handleMouseDown={handleMouseDown} menuVisibility={drop} />
      <Category
        category={category}
        handleMouseDown={handleMouseDown}
        menuVisibility={drop}
      />
      <div className="container">
        <div className="cat-ppal">
          <div className="catalogo">
            {products.map((fit) => {
              return (
                <motion.div
                  className="cont"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 1, rotate: -5 }}
                >
                  <li key={fit.id}>
                    {" "}
                    <ProductCard product={fit} />{" "}
                  </li>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
