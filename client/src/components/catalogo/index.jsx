import React from 'react';
import Category from "../categoria";
import ProductCard from "../ProductCard/ProductCard";

import "./catalogo.css";

const Catalogue = ({ products, category }) => {
  //TODO: No modificar este componente
  return (
    <div className="container-ppal">
      <div className="container">
        <div className="category">
          <Category
            category={category}
          />
        </div>
        <div className="cat-ppal">
          <div className="catalogo">
            {products.map((fit) => {
              return (
                <li key={fit.id}>
                  {" "}
                  <ProductCard
                    product={fit}
                  />{" "}
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
