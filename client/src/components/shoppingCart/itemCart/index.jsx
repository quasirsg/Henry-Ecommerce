import React from "react";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { Button, Col, Row } from "reactstrap";
import ButtonCircle from "../../custom/ButtonCircle";
import { useDispatch } from "react-redux";
import "./itemCart.css";
import {
  addAmount,
  deletAmount,
  deleteProductsCart,
} from "../../../redux/actions/userActions";

const ItemCart = ({ product, quantity }) => {
  const dispatch = useDispatch();

  let userId = 1;
  const handleOnClick = (e, productId, name) => {
    e.preventDefault();
    dispatch(deleteProductsCart(userId, productId, name));
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    dispatch(addAmount(userId, product.id, quantity));
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    dispatch(deletAmount(userId, product.id, quantity));
  };

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
                <div className="itemCart-title">{product.name}</div>
                <div className="itemCart-subtitle">$ {product.price}</div>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="d-flex flex-row-reverse" value={product.id}>
              <button
                onClick={(e) => handleOnClick(e, product.id, product.name)}
                className="itemCart-delete"
              >
                Remover
              </button>
            </div>
            <div className="d-flex flex-row-reverse" values={product.id}>
              <Button children={"+"} onClick={handleIncrement} />
              <div className="itemCart-count" values={product.id}>
                {quantity}
              </div>
              <Button children={"-"} onClick={handleDecrement} />
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ItemCart;
