import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavItem,
  NavLink,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import {
  GearFill,
  FileEarmarkPlus,
  Server,
  Files,
  CaretDown,
} from "react-bootstrap-icons";
import FormProduct from "../productForm";
import FormCategory from "../categoryForm";
import Catalogue from "../catalogo";
import ProductCard from "../productCard/ProductCard";
import InventoryTable from "./tools/inventoryTable";
import InventoryTableCategory from "./tools/inventoryTableCategory";

const AdminMenu = ({ products, allCategories }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const findProduct = () => {};

  return (
    <>
      <Container fluid className="mt-4">
        <Row>
          <Router>
            <Col md={3} lg={2} className="p-0">
              <Navbar light className="rounded-lg">
                <NavbarToggler
                  onClick={toggleNavbar}
                  className="mr-2 border-0"
                />
                <h5 className="mr-auto">Menu</h5>
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
                  </Nav>
                </Collapse>
              </Navbar>
            </Col>
            <Col md={9} lg={10}>
              <Route exact path="/admin/product">
                <FormProduct
                  allCategories={allCategories}
                  action="post"
                  icon="success"
                  message="Se agregó producto:"
                />
              </Route>
              <Route
                exact
                path="/admin/product/:id"
                render={({ match, history }) => (
                  <FormProduct
                    history={history}
                    action="put"
                    icon="info"
                    message="Se actualizo producto:"
                    {...products.find((item) => {
                      item.categories =
                        typeof item.categories[0] === "number"
                          ? item.categories
                          : item.categories.map(
                              (cat) => cat.product_category.category_id
                            );
                      return item.id === parseInt(match.params.id);
                    })}
                    allCategories={allCategories}
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
                    {...allCategories.find(
                      (item) => item.id === parseInt(match.params.id)
                    )}
                  />
                )}
              />
            </Col>
          </Router>
        </Row>
      </Container>
    </>
  );
};

export default AdminMenu;
