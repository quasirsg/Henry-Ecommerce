import React, { useState, useEffect } from "react";
import Category from "../categoria";
import "./catalogo.css";
import ProductCard from "../productCard/ProductCard";
import MenuButton from "./button/button.jsx";
import apiCall from '../../redux/api';
import { motion } from "framer-motion";

const Catalogue = ({ products = [], category = [] }) => {
  const [drop, setDrop] = useState(false);
  const [listProducts, setProducts] = useState(products);
  const toggleMenu = () => {
    setDrop(!drop);
  };

  const handleMouseDown = (e) => {
    toggleMenu();
    e.stopPropagation();
  };

  useEffect(() => {
    apiCall('/products', null, null, 'get')
      .then(response => {
        setProducts(response.data.products)
      })
  }, []);

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
            {listProducts.map((fit, index) => {
              return (
                <motion.div
                  key={index}
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
