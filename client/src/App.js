import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getProducts, getBanners } from './redux/actions/productActions';
import { getCategory } from './redux/actions/categoryActions';

//Components
import Navbar from "./components/navbar";
import ProductDetail from "./components/productDetail";
import FormCategory from "./components/categoryForm";
import TablaUsuarios from "./components/tablaUsuarios";

//Pages
import SearchPage from "./pages/SearchPage";
import AdminMenu from "./components/admin";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import UserPage from "./pages/UserPage";

// Componente Orden-> probando
import Orden from "./components/tablaOrdenes/Orden";
import TablaOrdenes from "./components/tablaOrdenes";
import FormUser from "./components/userForm";
import LoginForm from "./components/loginForm";

function App() {
  const dispatch = useDispatch();

  // Obtener products ,categorias y banners 
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getProducts());
    dispatch(getBanners());
  }, []);

  return (
    //No modifique ni elimine las rutas existentes
    <div classNasme="col-lg-12">
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
        <Route exact path="/ordenes" component={TablaOrdenes} />
        <Route exact path="/admin/ordenes/:id" component={Orden} />
        <Route exact path="/usuarios" component={TablaUsuarios} />
        <Route exact path="/admin">
          <AdminMenu />
        </Route>
        <Route exact path="/user" component={UserPage} />
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
