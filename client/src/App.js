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
<<<<<<< HEAD
    <div>
      <SearchBar />
      <Switch>
        <Route exact path="/producto/:id" component={Product} />
      </Switch>
    </div>
=======
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
>>>>>>> 36a3dedcbcabc710a0e792d7f018d6915768bb78
  );
}

export default App;
