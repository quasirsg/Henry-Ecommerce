import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

//Components
import Navbar from "./components/navbar";
import ProductDetail from "./components/productDetail";
import FormCategory from "./components/categoryForm";
import ShoppingCart from "./components/shoppingCart";
import FormUser from "./components/userForm";

//Pages
import SearchPage from "./pages/SearchPage";
import AdminMenu from "./components/admin";
import HomePage from "./pages/HomePage";

function App() {
  return (
    //No modifique ni elimine las rutas existentes
    <div className="col-lg-12">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/search/q/" component={SearchPage} />
        <Route path="/search/category/" component={SearchPage} />
        <Route exact path="/products" component={HomePage} />
        <Route exact path="/product/:id">
          <ProductDetail />
        </Route>
        <Route exact path="/cart" component={ShoppingCart} />
        <Route exact path="/admin">
          <AdminMenu />
        </Route>

        <Route exact path="/user/register">
          <FormUser 
            action="post" 
            icon="success"
            message="Usuario agregado"
          />
        </Route>

        <Route
          exact
          path="/admin/category/add"
          render={() => (
            <FormCategory
              action="post"
              icon="success"
              message="La categoria fue creada:"
            />
          )}
        />
        <Route
          exact
          path="/admin/category/edit/:categoryId"
          render={() => (
            <FormCategory
              action="put"
              icon="success"
              message="La categoria fue editada:"
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
