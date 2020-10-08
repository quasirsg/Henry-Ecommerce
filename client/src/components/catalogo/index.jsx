import React, { useEffect, useState } from "react";
import Category from "../categoria";
import ProductCard from "../ProductCard/ProductCard";
import "./Catalogo.css";
import axios from "axios";

const Catalogue = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products/")
      .then((res) => {
        console.log(res.data.products);
        return setData(res.data.products);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  //TODO: cuadrar responsive
  return (
    <div className="container">
      <Category />

      <div className="catalogo">
        {data.map((fit) => {
          return <ProductCard business={fit} key={fit.id} />;
        })}
      </div>
    </div>
  );
};

export default Catalogue;
