import React from "react";
import ProductCard from "../productCard/ProductCard";
import "./catalogo.css";

const Catalogue = ({ products, userId }) => {
  return (
    <div className="col-lg-10 mt-4">
      <div className="container-fluid">
        <div className="cat-ppal">
          <div className="catalogo">
            {products.map(
              (fit) =>
                fit.stock >= 0 && (
                  <li key={fit.id}>
                    <ProductCard product={fit} userId={userId} />
                  </li>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
