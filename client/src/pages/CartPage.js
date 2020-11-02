import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button, Jumbotron } from "reactstrap";
import { Link } from "react-router-dom";
import ShoppingCart from "../components/shoppingCart";
import ButtonBlock from "../components/custom/ButtonBlock";
import { useSelector, useDispatch } from "react-redux";
import {
  addProducts,
  deleteAllCart,
  getProductCart,
} from "../redux/actions/userActions";
import { getCurrentUser } from "../redux/actions/jwtUsers";
import { CartX } from "react-bootstrap-icons";

const Cart = () => {
  const dispatch = useDispatch();
  let productsCarts = useSelector((state) => state.users.carrito);
  let user = useSelector((state) => state.session.userDetail);
  const [userData, setUserData] = useState(null);

  if (localStorage.token) {
    var token = localStorage.getItem("token");
    var userId = user.id;
  }

  useEffect(() => {
    dispatch(getCurrentUser(token));
    dispatch(getProductCart(userId));
    function checkUsetData() {
      const item = localStorage.getItem("token");
      if (item) {
        setUserData(item);
      }
    }
    window.addEventListener("storage", checkUsetData);
    return () => {
      window.removeEventListener("storage", checkUsetData);
    };
  }, []);

  const deleteAll = (e) => {
    e.preventDefault();
    dispatch(deleteAllCart(userId));
  };

  /* cambio de guest-login */
  if (!userData && !localStorage.token) {
    if (localStorage.cart) {
      productsCarts = JSON.parse(localStorage.getItem("cart"));
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }

  const totalCalc = () => {
    let total = 0;
    if (productsCarts.length > 0) {
      productsCarts.forEach((product) => {
        let subTotal = product.price * product.quantity;
        return (total += subTotal);
      });
    }
    return total;
  };

  return productsCarts.length > 0 ? (
    <Container fluid={true} className="mt-4">
      <Row>
        <Col lg="8">
          <div className="overflow-y">
            <ShoppingCart items={productsCarts} userId={userId} />
          </div>
        </Col>
        <Col lg="4">
          {productsCarts.length > 0 && (
            <>
              <Col className="mb-3">
                <>
                  <h3>Total de la compra: $ {totalCalc()}</h3>
                  <hr />
                </>
              </Col>
              <Link to="/checkout">
                <ButtonBlock className="siguiente" children={"Siguiente"} />
              </Link>
              <Button
                className="mt-3"
                children={"Eliminar Carrito"}
                onClick={deleteAll}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  ) : (
    <div className="col-10 mx-auto mt-5">
      <Jumbotron>
        <h5 className="display-4 text-center">
          <CartX size={90} /> No tiene productos en el carrito
        </h5>
      </Jumbotron>
    </div>
  );
};

export default Cart;
