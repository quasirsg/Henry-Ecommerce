import React from "react";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { Col, Row } from "reactstrap";
import allActions from "../../../redux/actions/allActions";
import ButtonCircle from "../../custom/ButtonCircle";

import "./itemCart.css";
const ItemCart = ({ product, quantity }) => {

  const handleOnClick() =>
  return (
    <Col lg="12">
      <div className="itemCart">
        <Row>
          <Col lg="6">
            <div className="row-flex">
              <div className="itemCart__image">
                <img src={product.image} className="img-fill" alt="" />
              </div>
              <div className="itemCart__content">
                <div className="itemCart-title">{product.title}</div>
                <div className="itemCart-subtitle">$ {product.price}</div>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="d-flex flex-row-reverse">
              <button onClick={handleOnClick} className="itemCart-delete">Remover</button>
            </div>
            <div className="d-flex flex-row-reverse">
              <ButtonCircle children={"+"} />
              <div className="itemCart-count">{quantity}</div>
              <ButtonCircle children={"-"} />
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
  };

  export default ItemCart;
