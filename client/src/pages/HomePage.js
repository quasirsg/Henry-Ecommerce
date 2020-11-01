import React, { useEffect } from "react";
import { Container, Col, Row, UncontrolledCarousel } from "reactstrap";
import { ShieldFillCheck, Percent, Truck } from "react-bootstrap-icons";
import Categoria from "../components/categoria";
import Catalogo from "../components/catalogo";
import { useSelector, useDispatch } from "react-redux";
import { verifySession } from "../redux/actions/jwtUsers";
import { addProducts } from "../redux/actions/userActions";

const HomePage = () => {
  const categorias = useSelector((state) => state.category.category);
  const productos = useSelector((state) => state.products.allProducts);
  const productBanners = useSelector((state) => state.products.productBanner);
  const user = useSelector((state) => state.session.userDetail);
  const dispatch = useDispatch();

  if (user) {
    var userId = user.id;
    if (localStorage.cart) {
      let productsCarts = JSON.parse(localStorage.getItem("cart"));
      console.log(productsCarts);
      dispatch(addProducts(userId, productsCarts));
      localStorage.removeItem("cart");
    }
  }

  useEffect(() => {
    dispatch(verifySession());
  }, []);

  return (
    <Container fluid={true} className="mt-4">
      <Row>
        <Col lg="10">
          <UncontrolledCarousel items={productBanners} className="my-5" />
        </Col>
        <Col lg="2 my-auto">
          <div
            style={{ border: "1px solid #CED4DA", borderRadius: "5px" }}
            className="py-3"
          >
            <div style={{ color: "#3B3B3B", padding: "10px 0" }}>
              <ShieldFillCheck className="w-100" size={50} />
              <p className="text-center py-2">Pago 100% Seguro</p>
            </div>
            <div style={{ color: "#3B3B3B", padding: "10px 0" }}>
              <Truck className="w-100" size={50} />
              <p className="text-center">Envio Dentro De las 48 Horas</p>
            </div>
            <div style={{ color: "#3B3B3B", padding: "10px 0" }}>
              <Percent className="w-100" size={50} />
              <p className="text-center">
                Disfruta de Descuentos y Promociones
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Categoria categorys={categorias} />
        <Catalogo products={productos} userId={userId} />
      </Row>
    </Container>
  );
};

export default HomePage;
