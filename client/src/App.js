import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
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
import ProtectedUserRoute from "./components/protectedComponents/ProtectedUserRoute";
import InventoryTable from "./components/admin/tools/inventoryTable";
import InventoryTableCategory from "./components/admin/tools/inventoryTableCategory";
import FormProduct from "./components/productForm";

function App() {
  const dispatch = useDispatch();

  const session = useSelector((state) => state.session.userDetail);

  // Obtener products ,categorias y banners
  let log;
  if (session.role) {
    log = session.role;
  } else {
    log = "guest";
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
        {/* =============== Unprotected Routes ============ */}
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/search/q/" component={SearchPage} />
        <Route path="/search/category/" component={SearchPage} />
        <Route exact path="/products" component={HomePage} />
        <Route exact path="/product/:id">
          <ProductDetail />
        </Route>
        <Route exact path="/cart" component={CartPage} />
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

        {/* <Route path="*" render={() => "404 Not Found"} /> */}

        {/* ========== Protected Routes ========== */}
        {/* ### Admin ### */}
        <ProtectedAdminRoute
          exact
          path="/admin"
          component={AdminMenu}
          log={log}
        />
        <ProtectedAdminRoute
          exact
          path="/ordenes"
          component={TablaOrdenes}
          log={log}
        />
        <ProtectedAdminRoute
          exact
          path="/admin/ordenes/:id"
          component={TablaOrdenes}
          log={log}
        />
        <ProtectedAdminRoute
          exact
          path="/admin/product"
          component={FormProduct}
          log={log}
        />
        <ProtectedAdminRoute
          exact
          path="/admin/products"
          component={InventoryTable}
          log={log}
        />
        <ProtectedAdminRoute
          exact
          path="/admin/categories"
          component={InventoryTableCategory}
          log={log}
        />
        <ProtectedAdminRoute
          exact
          path="/admin/usuarios"
          component={TablaUsuarios}
          log={log}
        />

        <ProtectedAdminRoute
          exact
          path="/admin/category/edit/:categoryId"
          component={FormCategory}
          action={"put"}
          icon={"success"}
          message={"La categoria fue editada:"}
          log={log}
        />
        <ProtectedAdminRoute
          exact
          path="/admin/category"
          component={FormCategory}
          action={"post"}
          icon={"success"}
          message={"La categoria fue creada:"}
          log={log}
        />
        {/* ### User ### */}
        <ProtectedUserRoute
          exact
          path="/user/account"
          component={UserPage}
          log={log}
        />
        <ProtectedUserRoute
          exact
          path="/checkout"
          component={CheckoutForm}
          log={log}
        />
      </Switch>
    </div>
  );
}

export default App;
