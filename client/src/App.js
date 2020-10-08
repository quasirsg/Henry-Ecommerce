import React from 'react';

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
      </Switch>
    </div>
  );

}

export default App;
