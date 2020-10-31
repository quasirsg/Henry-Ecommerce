import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "reactstrap";
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

const Cart = () => {
  const dispatch = useDispatch();
  let productsCarts = useSelector((state) => state.users.carrito);
  let user = useSelector((state) => state.session.userDetail);
  const [userData, setUserData] = useState(null);

  // TODO: utilizar redux
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
    //??Guest
    if (localStorage.cart) {
      productsCarts = JSON.parse(localStorage.getItem("cart"));
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  } else if (userData || localStorage.token) {
    if (localStorage.cart) {
      //?? Loguin
      productsCarts = JSON.parse(localStorage.getItem("cart"));
      dispatch(addProducts(userId, productsCarts));
      localStorage.removeItem("cart");
      setUserData(null); //evitar un loop
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

  return (
    <Container fluid={true} className="mt-4">
      <Row>
        <Col lg="8">
          <ShoppingCart items={productsCarts} userId={userId} />
        </Col>
        <Col lg="4">
          {productsCarts.length > 0 && (
            <>
              <Col>Total: $ {totalCalc()}</Col>
              <Link to="/checkout">
                <ButtonBlock children={"Siguiente"} />
              </Link>
              <Button children={"Eliminar Carrito"} onClick={deleteAll} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
