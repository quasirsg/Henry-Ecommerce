import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
} from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  NavbarToggler,
  Collapse,
  Jumbotron,
} from "reactstrap";
import {
  PersonBadge,
  FileEarmarkPlus,
  Server,
  Files,
  CaretDown,
  PersonCircle,
} from "react-bootstrap-icons";
import FormProduct from "../productForm";
import FormCategory from "../categoryForm";
import TablaOrdenes from "../tablaOrdenes";
import TablaUsuarios from "../tablaUsuarios";
import InventoryTable from "./tools/inventoryTable";
import InventoryTableCategory from "./tools/inventoryTableCategory";
import { getCategory } from "../../redux/actions/categoryActions";
import { getProducts } from "../../redux/actions/productActions";
import { getOrders } from "../../redux/actions/ordenActions";
import Orden from "../tablaOrdenes/Orden";
import UserPage from "../../pages/UserPage";

/* desde aca llamar al userpage*/

const AdminMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const session = useSelector((state) => state.session.userDetail);
  const allCategories = useSelector((state) => state.category.category);

  return (
    <>
      <Container fluid className="mt-4">
        <Row>
          <Router>
            <Col md={3} lg={2} className="p-0">
              <Navbar light className="rounded-lg">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <Navbar light className="rounded-lg">
                      <NavbarToggler
                        onClick={toggleNavbar}
                        className="mx-auto border-0"
                      />
                      <h5 className="mx-auto">Administracion</h5>
                      <Collapse isOpen={!collapsed} navbar>
                        <Nav navbar>
                          <NavItem>
                            <NavLink tag={Link} to="/admin/product">
                              <FileEarmarkPlus size={17} className="mr-1" />
                              Nuevo Producto
                            </NavLink>
                          </NavItem>
                          <NavItem className="pb-2 border-bottom">
                            <NavLink tag={Link} to="/admin/category">
                              <FileEarmarkPlus size={17} className="mr-1" />
                              Nueva Categoría
                            </NavLink>
                          </NavItem>
                          <p className="text-secondary m-0">
                            <Server size={17} className="mr-1" />
                            Inventario
                            <CaretDown size={17} className="ml-1" />
                          </p>
                          <NavItem>
                            <NavLink tag={Link} to="/admin/products">
                              <Files size={17} className="mr-1" />
                              Productos
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink tag={Link} to="/admin/categories">
                              <Files size={17} className="mr-1" />
                              Categorias
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink tag={Link} to="/admin/ordenes">
                              <Files size={17} className="mr-1" />
                              Ordenes
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink tag={Link} to="/admin/usuarios">
                              <Files size={17} className="mr-1" />
                              Usuarios
                            </NavLink>
                          </NavItem>
                          <p className="text-secondary m-0">
                            <PersonCircle size={17} className="mr-1" />
                            Usuario
                            <CaretDown size={17} className="ml-1" />
                          </p>
                          <NavItem>
                            <NavLink tag={Link} to="/user/account">
                              <Files size={17} className="mr-1" />
                              Perfil
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </Collapse>
                    </Navbar>
                  </li>
                </ul>
              </Navbar>
            </Col>

            <Col md={9} lg={10}>
              {
                <>
                  <Route exact path="/admin">
                    <div className="col-10 mx-auto">
                      <Jumbotron>
                        <h2 className="display-3">
                          <PersonBadge /> ¡Bienvenido Administrador!
                        </h2>
                        <hr className="my-2" />
                        <p>
                          Este es el panel desde donde podra tener el control de su E-commerce.
                        </p>
                      </Jumbotron>
                    </div>
                  </Route>
                  <Route exact path="/admin/product">
                    <FormProduct action="post" />
                  </Route>
                  <Route
                    exact
                    path="/admin/product/:id"
                    render={({ match, history }) => (
                      <FormProduct
                        history={history}
                        id={match.params.id}
                        action="put"
                      />
                    )}
                  />
                  <Route exact path="/admin/category">
                    <FormCategory
                      action="post"
                      icon="success"
                      message="Se agregó categoría:"
                    />
                  </Route>
                  <Route exact path="/admin/products">
                    <InventoryTable />
                  </Route>
                  <Route exact path="/admin/categories">
                    <InventoryTableCategory />
                  </Route>
                  <Route
                    exact
                    path="/admin/category/:id"
                    render={({ match, history }) => (
                      <FormCategory
                        history={history}
                        action="put"
                        icon="success"
                        message="Se edito categoría:"
                        {...(allCategories &&
                          allCategories.find(
                            (item) => item.id === parseInt(match.params.id)
                          ))}
                      />
                    )}
                  />
                  <Route exact path="/admin/ordenes">
                    <TablaOrdenes />
                  </Route>
                  <Route exact path="/admin/ordenes/:id">
                    <Orden />
                  </Route>
                  <Route exact path="/admin/usuarios">
                    <TablaUsuarios />
                  </Route>{" "}
                  <Route exact path="/user/account">
                    <UserPage />
                  </Route>
                </>
              }
            </Col>
          </Router>
        </Row>
      </Container>
    </>
  );
};

export default AdminMenu;
