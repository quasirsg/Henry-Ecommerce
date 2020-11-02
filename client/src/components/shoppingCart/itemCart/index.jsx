import React from "react";
import { Button, Col, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import "./itemCart.css";
import {
  addAmount,
  deletAmount,
  deleteProductsCart,
} from "../../../redux/actions/userActions";
import { Trash } from "react-bootstrap-icons";

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
          <Col lg="4" className="mx-auto">
            <div className="itemCart-title">{product.name.slice(0, 20)}</div>
            <div className="">
              <img src={product.image} className="img-fill pl-4 pr-4" alt="" />
            </div>
          </Col>
          <Col lg="5">
            <div className="row-flex">
              <div className="itemCart__content">
                <div className="itemCart-subtitle mb-3 mt-4">
                  Precio: $ {product.price}
                </div>
                <div className="itemCart-subtitle">
                  Sub-total: $ {product.price * product.quantity}
                </div>
                <div className="mt-3">
                  {product.stock > 0 ? (
                    <span class="badge badge-pill badge-success">En stock</span>
                  ) : (
                    <span class="badge badge-pill badge-danger">Sin stock</span>
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col lg="3">
            <div className="d-flex flex-row-reverse" value={product.id}>
              <button onClick={handleOnClick} className="itemCart-delete">
                <Trash className="trash" size={25} />
              </button>
            </div>
            <div className="d-flex flex-row-reverse" values={product.id}>
              <Button
                className="quantity-button"
                children={"+"}
                onClick={handleIncrement}
              />
              <div className="itemCart-count" values={product.id}>
                {product.quantity}
              </div>
              <Button
                className="quantity-button"
                children={"-"}
                onClick={handleDecrement}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ItemCart;
