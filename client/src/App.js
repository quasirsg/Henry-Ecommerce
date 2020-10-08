import React from "react";

import {
  Switch,
  Route,
} from "react-router-dom";

import Navbar from './components/navbar'
import Product from "./components/producto";
import Catalogue from "./components/catalogo";
import FormProduct from './components/product';

function App() {
  // TODO:Hacer las routes con react-router
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/producto/:id" component={Product} />
        <Route path="/" exact> Inicio {/* <Catalogo/> */} </Route>
        //TODO: agregar las rutas que faltan para que el formulario funcione al actualizar o eliminar.
        <Route
          exact path='/admin/product'
          render={() =>
            <FormProduct
              action='post'
              icon='success'
              message='Se agregó producto:'
            />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
