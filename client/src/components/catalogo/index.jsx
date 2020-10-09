import React, { useEffect, useState } from "react";
import Category from "../categoria";
import "./Catalogo.css";
import ProductCard from "../productCard/ProductCard";
// import { Link } from "react-router-dom";
// import axios from "axios";

const Catalogue = ({ props }) => {
  // console.log(props);
  //TODO: cuadrar responsive
  return (
    <div className="container">
      <Category />

      <div className="catalogo">
        {props.map((fit) => {
          return (
            <li key={fit.id}>
              {" "}
              <ProductCard product={fit} />{" "}
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Catalogue;
