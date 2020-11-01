import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Person, Lock, BoxSeam, ChatSquareText } from "react-bootstrap-icons";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ButtonSquare from "../components/custom/ButtonSquare";
import UserDetail from "../components/userDetail";
import UserReviews from "../components/userReviews";
import UserOrders from "../components/userOrders";
import UserPassword from "../components/userPassword";

const UserPage = () => {
  const userDetail = useSelector((state) => state.session.userDetail);
  return (
    <Container
      fluid={true}
      style={{
        border: "1px solid #ccc9c9",
        padding: "2rem 3rem",
        marginTop: "3rem",
      }}
    >
      <Router>
        <Row>
          <Col lg="3">
            <ul style={{ margin: "0", padding: "3rem 0" }}>
              <li>
                <Link to="/user/account">
                  <ButtonSquare
                    icon={<Person size={20} />}
                    Children={"Mi cuenta"}
                  />
                </Link>
              </li>
              <li>
                <Link to="/user/orders">
                  <ButtonSquare
                    icon={<BoxSeam size={20} />}
                    Children={"Mis Pedidos"}
                  />
                </Link>
              </li>
              <li>
                <Link to="/user/reviews">
                  <ButtonSquare
                    icon={<ChatSquareText size={20} />}
                    Children={"Mis Reviews"}
                  />
                </Link>
              </li>
              <li>
                <Link to="/user/change-password">
                  <ButtonSquare
                    icon={<Lock size={20} />}
                    Children={"Cambiar Mi Contraseña"}
                  />
                </Link>
              </li>
            </ul>
          </Col>
          <Col
            lg="9"
            style={{
              border: "1px solid #ccc9c9",
              padding: "3rem 1rem",
              margin: "3rem 0",
            }}
          >
            <Route
              exact
              path="/user/account"
              component={() => <UserDetail />}
            />
            <Route
              exact
              path="/user/reviews"
              component={() => <UserReviews id={userDetail.id} />}
            />
            <Route
              exact
              path="/user/orders"
              component={() => <UserOrders id={userDetail.id} />}
            />
            <Route
              exact
              path="/user/change-password"
              component={() => <UserPassword id={userDetail.id} />}
            />
          </Col>
        </Row>
      </Router>
    </Container>
  );
};

export default UserPage;
