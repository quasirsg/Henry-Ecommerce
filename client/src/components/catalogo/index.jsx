import React from "react";
import ProductCard from "../productCard/ProductCard";
import "./catalogo.css";
import { motion } from "framer-motion";

const Catalogue = ({ products, userId }) => {
  return (
    <div className="col-lg-10 mt-4">
      <div className="container-fluid">
        <div className="cat-ppal">
          <div className="catalogo">
            {products.map(
              (fit) =>
                fit.stock !== 0 && (
                  <motion.div
                    key={fit.id}
                    className="cont"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 1, rotate: -5 }}
                  >
                    <li key={fit.id}>
                      <ProductCard product={fit} userId={userId} />
                    </li>
                  </motion.div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
