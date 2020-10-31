import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getBanners } from "./redux/actions/productActions";
import { getCategory } from "./redux/actions/categoryActions";
import { verifySession } from "./redux/actions/jwtUsers";

//Components
import Navbar from "./components/navbar";
import ProductDetail from "./components/productDetail";
import FormCategory from "./components/categoryForm";
import TablaUsuarios from "./components/tablaUsuarios";
import Orden from "./components/tablaOrdenes/Orden";
import TablaOrdenes from "./components/tablaOrdenes";
import FormUser from "./components/userForm";
import LoginForm from "./components/loginForm";
import CheckoutForm from "./components/checkout";

//Pages
import SearchPage from "./pages/SearchPage";
import AdminMenu from "./components/admin";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import UserPage from "./pages/UserPage";
import ProtectedAdminRoute from "./components/protectedComponents/ProtectedAdminRoute";

//Rutas Admin

function App() {
  const dispatch = useDispatch();

  const session = useSelector((state) => state.session.userDetail);
  console.log(session);

  // Obtener products ,categorias y banners
  let log;
  if (session.role) {
    log = session.role;
  }

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getProducts());
    dispatch(getBanners());
    dispatch(verifySession());
  }, []);

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
        <Route exact path="/cart" component={CartPage} />
        <ProtectedAdminRoute
          exact
          path="/admin"
          component={AdminMenu}
          log={log}
        />

        {/* <Route exact path="/ordenes" component={TablaOrdenes} /> */}
        {/* <Route exact path="/usuarios" component={TablaUsuarios} /> */}

        {/* <Route exact path="/admin">
          {session.role === "admin" ? <AdminMenu /> : <Redirect to={"/"} />}
        </Route> */}

        <Route exact path="/checkout" component={CheckoutForm} />
        <Route exact path="/user/account">
          {Object.keys(session).length > 0 ? (
            <UserPage />
          ) : (
            <Redirect to={"/user/login"} />
          )}
        </Route>
        <Route exact path="/user/register">
          <FormUser action="post" icon="success" message="Usuario agregado" />
        </Route>
        <Route
          exact
          path="/user/login"
          render={({ history }) => (
            <LoginForm
              action="post"
              icon="success"
              message="Usuario agregado"
              history={history}
            />
          )}
        ></Route>

        {/* <Route
          exact
          path="/admin/category/add"
          render={() => (
            <FormCategory
              action="post"
              icon="success"
              message="La categoria fue creada:"
            />
          )}
        /> */}
        {/* <Route
          exact
          path="/admin/category/edit/:categoryId"
          render={() => (
            <FormCategory
              action="put"
              icon="success"
              message="La categoria fue editada:"
            />
          )}
        /> */}
      </Switch>
    </div>
  );
}

export default App;
