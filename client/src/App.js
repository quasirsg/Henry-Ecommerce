import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  // TODO: linkear los componentes cuando esten listos
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          Inicio
          {/* <Catalogo/> */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
