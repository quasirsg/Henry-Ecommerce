import React, { useEffect, useState } from "react";
import Category from "../categoria";
import ProductCard from "../ProductCard/ProductCard";
import "./Catalogo.css";
// import { Link } from "react-router-dom";
// import axios from "axios";

const Catalogue = ({ props }) => {
  // console.log(props);
  //TODO: cuadrar responsive
  return (
    <div className="container">
      <Category />

      <div className="catalogo">
        <ul>
          {props.map((fit) => {
            return (
              <li key={fit.id}>
                <ProductCard product={fit} />;
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Catalogue;
