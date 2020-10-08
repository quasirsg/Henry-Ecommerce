import React, { useState, useEffect } from "react";
import Product from "./components/producto";
import { Switch, Route } from "react-router-dom";

function App() {

  return (
    <Switch>
      <Route path="/" exact>
      </Route>
      <Route path="/producto/:id" component={Product} />
    </Switch>
  );
}

export default App;
