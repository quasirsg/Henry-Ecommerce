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

function App() {
  // TODO:Hacer las routes con react-router
  return (
    <Switch>
    <Route path="/" exact>
          Inicio
          {/* <Catalogo/> */}
        </Route>
      <Route exact path="/producto/:id" component={Product} />
    //TODO: agregar las rutas que faltan para que el formulario funcione al actualizar o eliminar. 
      <Route 
       exact path='/admin/product' 
       render={() => <FormProduct action='post' icon='success' message='Se agregó producto:' />}
       />
    </Switch>
  );
}

export default App;
