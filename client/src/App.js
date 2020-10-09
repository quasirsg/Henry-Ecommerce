import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import ProductDetail from "./components/productDetail";
import Catalogue from "./components/catalogo";
import FormProduct from "./components/productForm";
import SearchBar from "./components/SearchBar";

//Pages
import SearchPage from './pages/SearchPage';

function App() {
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
    <div>
      <SearchBar />
      <Switch>
        <Route path="/products" exact>
          <Catalogue props={product} />
        </Route>
        <Route exact path="/product/:id">
          <ProductDetail props={product} />
        </Route>
        <Route exact path="/search/q/:searchTerm" component={SearchPage} />
        <Route
          exact
          path="/admin/product"
          render={() => (
            <FormProduct
              action="post"
              icon="success"
              message="Se agregó producto:"
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
