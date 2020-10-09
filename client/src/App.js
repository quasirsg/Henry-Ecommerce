import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

//Components
import Navbar from './components/navbar'
import ProductDetail from "./components/productDetail";
import Catalogue from "./components/catalogo";
import FormProduct from "./components/productForm";
import FormCategory from './components/categories';

//Pages
import SearchPage from './pages/SearchPage';

function App() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/`)
      .then((res) => {
        return setProduct(res.data.products);
      })
      .catch((err) => {
        return;
      });
    axios
      .get(`http://localhost:3001/category/`)
      .then((res) => {
        return setCategory(res.data.category);
      })
      .catch((err) => {
        return;
      });
  }, []);

  return (
    //No modifique ni elimine las rutas existentes
    <div className="col-lg-12">
      <Navbar />
      <Switch>
        <Route path="/search" component={SearchPage} />
        <Route exact path="/products">
          <Catalogue
            products={product}
            category={category}
          />
        </Route>
        <Route exact path="/product/:id">
          <ProductDetail
            props={product}
          />
        </Route>
        <Route exact path="/admin/product" render={() => (
          <FormProduct
            action="post"
            icon="success"
            message="Se agregó producto:"
          />
        )}
        />
        <Route exact path='/admin/category' render={() =>
          <FormCategory
            action='post'
            icon='success'
            message='La categoria fue creada:'
          />
        }
        />
        <Route exact path='/admin/category' render={() =>
          <FormCategory
            action='post'
            icon='success'
            message='La categoria fue creada:'
          />
        }
        />
      </Switch>
    </div>
  );
}

export default App;
