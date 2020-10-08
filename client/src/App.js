import React, { useState, useEffect } from "react";
import Product from "./components/productDetail";
import {Catalogue} from './components/catalogo'
import { Switch, Route } from "react-router-dom";
import Axios from "axios";

function App() {
  // TODO:Hacer las routes con react-router
  const [product, setProduct] = useState([]);
  /* ===== Axios Product =====*/

  // let productId = null;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/`)
      .then((res) => {
        return setProduct(res.data.products);
      })
      .catch((err) => {
        return;
      });
  }, []);

  return (
    <Switch>
      <Route path="/" exact>
        <Catalogue props={product} />
      </Route>
      <Route path="/product/:id" component={Product} />
    </Switch>
  );
}

export default App;
