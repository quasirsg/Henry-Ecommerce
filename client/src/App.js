import React from "react";
import Product from "./components/produto";
import ProductDetail from "./components/productDetail/";
import Catalogue from "./components/catalogo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import ProductCard from "./components/ProductCard/ProductCard";

function App() {
  return (
    <div>
      <Catalogue />
    </div>
  );
}

export default App;
