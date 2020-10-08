import React from "react";
import Product from "./components/produto";
import ProductDetail from "./components/productDetail/";
import Catalogue from "./components/catalogo";
import FormProduct from './components/product'
import {
  Switch,
  Route,
} from "react-router-dom";

import Product from "./components/produto";
import SearchBar from './components/SearchBar'

function App() {
  // TODO:Hacer las routes con react-router
  return (
    <div>
      <SearchBar />
      <Switch>
        <Route exact path="/producto/:id" component={Product} />
        <Route path="/" exact> Inicio {/* <Catalogo/> */} </Route>
        //TODO: agregar las rutas que faltan para que el formulario funcione al actualizar o eliminar.
        <Route
          exact path='/admin/product'
          render={() => {
            <FormProduct
              action='post'
              icon='success'
              message='Se agregó producto:'
            />
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
