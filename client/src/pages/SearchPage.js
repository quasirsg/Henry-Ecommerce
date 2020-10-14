import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import Catalogo from '../components/catalogo';

const SearchPage = () => {
  let { searchTerm } = useParams();
  let { categoryId } = useParams();

  const [products, setProductos] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/products/category/image`)
      .then(res => {
        console.log(res);
        setProductos(res.data.results);
      });
  }, []);

  return (
    <Catalogo
      products={products}
      category={[
        {
          id: 1,
          name: "Vitaminas",
        },
        {
          id: 2,
          name: "suplementos",
        },
      ]}
    />
  );
};

export default SearchPage;
