import React from "react";
import { Button, Col, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import "./itemCart.css";
import {
  addAmount,
  deletAmount,
  deleteProductsCart,
} from "../../../redux/actions/userActions";

const ItemCart = ({ product, userId }) => {
  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(deleteProductsCart(userId, product.id, product.name));
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    dispatch(addAmount(userId, product.id, product.quantity));
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    dispatch(deletAmount(userId, product.id, product.quantity));
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
            <div className="itemCart-subtitle"> Stock {product.stock}</div>
            <div className="d-flex flex-row-reverse" value={product.id}>
              <button onClick={handleOnClick} className="itemCart-delete">
                Remover
              </button>
            </div>
            <div className="d-flex flex-row-reverse" values={product.id}>
              <Button children={"+"} onClick={handleIncrement} />
              <div className="itemCart-count" values={product.id}>
                {product.quantity}
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
