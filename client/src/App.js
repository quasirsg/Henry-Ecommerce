import React from 'react';
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
    </Switch>
  );
}

export default App;
