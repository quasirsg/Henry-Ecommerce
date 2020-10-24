import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "reactstrap";
import ShoppingCart from "../components/shoppingCart";
import ButtonBlock from "../components/custom/ButtonBlock";
import { useSelector, useDispatch } from "react-redux";
import { addProductCart, deleteAllCart } from "../redux/actions/userActions";
import { getOneOrder } from "../redux/actions/ordenActions";

const Cart = () => {
  const prueba = useSelector((state) => state);
  let productsCarts = useSelector((state) => state.users.carrito);
  let products = useSelector((state) => state.users.carrito);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
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

  const userId = 1; //?? loguin o guest
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
    //cambio guest-loguin userdata!==null Ex. token
    if (localStorage.cart) {
      //?? Loguin
      productsCarts = JSON.parse(localStorage.getItem("cart"));
      productsCarts.map((item) => {
        dispatch(addProductCart(userId, item)); //al hacer un dispatch distinto por producto genera ordenes distintas por producto
      });
      localStorage.removeItem("cart");
      setUserData(null); //evitar un loop
    }
  }

  console.log(productsCarts);

  /* Sin cambio a login */
  // Verificar que exista una sesion
  // if (!localStorage.token) {
  //   if (localStorage.cart) {
  //     productsCarts = JSON.parse(localStorage.getItem("cart"));
  //   } else {
  //     productsCarts = [];
  //   }
  // } else {
  //   if (localStorage.cart) {
  //     productsCarts = JSON.parse(localStorage.getItem("cart"));
  //     productsCarts.forEach((item) => {
  //       dispatch(addProductCart(userId, item));
  //     });
  //   }
  // }

  return (
    <Container fluid={true} className="mt-4">
      <Row>
        <Col lg="8">
          <ShoppingCart items={productsCarts} />
        </Col>
        <Col lg="4">
          <ButtonBlock children={"Siguiente"} />
          <Button children={"Eliminar Carrito"} onClick={deleteAll} />
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
