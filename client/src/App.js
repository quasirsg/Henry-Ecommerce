import React from "react";
import { Switch, Route } from "react-router-dom";

//Components
import Navbar from "./components/navbar";
import ProductDetail from "./components/productDetail";
import FormCategory from "./components/categoryForm";

//Pages
import SearchPage from "./pages/SearchPage";
import AdminMenu from "./components/admin";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

// Componente Orden-> probando
import Orden from "./components/Orden/orden.jsx";
import FormUser from './components/userForm';

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
        <Route exact path="/order" component={Orden} />
        <Route exact path="/product/:id">
          <ProductDetail />
        </Route>
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/admin">
          <AdminMenu />
        </Route>

        <Route exact path="/user/register">
          <FormUser action="post" icon="success" message="Usuario agregado" />
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
