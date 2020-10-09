import React from "react";

import {
  Switch,
  Route,
} from "react-router-dom";

import Navbar from './components/navbar'
import Product from "./components/producto";
import Catalogue from "./components/catalogo";
import FormProduct from './components/product';
import FormCategory from './components/categories';

function App() {
  // TODO:Hacer las routes con react-router
  return (
    <div>
      <Navbar />
      <Switch>
        
        <Route exact path="/producto/:id" component={Product} />
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
         <Route
          exact path='/admin/category'
          render={() =>
            <FormCategory
              action='delete'
              icon='success'
              message='La categoria fue eliminada:'
            />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
