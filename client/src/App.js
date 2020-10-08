import React from "react";
import ProductDetail from "./components/productDetail/";
import Catalogue from "./components/catalogo";
import FormProduct from "./components/productForm";
import { Switch, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";

function App() {
  // TODO:Hacer las routes con react-router
  return (
    <div>
      <SearchBar />
      <Switch>
        <Route path="/" exact>
          {" "}
          Inicio {/* <Catalogo/> */}{" "}
        </Route>
        //TODO: agregar las rutas que faltan para que el formulario funcione al
        <Route
          exact
          path="/admin/product"
          render={() => {
            <FormProduct
              action="post"
              icon="success"
              message="Se agregó producto:"
            />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
