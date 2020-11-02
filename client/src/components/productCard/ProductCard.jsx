import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  Button,
  Toast,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./productCard.css";
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct } from "../../redux/actions/productActions";
import { addProductCart } from "../../redux/actions/userActions";
import toast from "../alerts/toast";

const ProductCard = ({ product, userId }) => {
  const dispatch = useDispatch();
  const handleOnclick = () => {
    dispatch(getOneProduct(product.id));
  };

  product.quantity = 1;
  const handleClick = () => {
    dispatch(addProductCart(userId, product));
  };

  return (
    <Card>
      <Link to={`/product/${product.id}`}>
        <CardImg
          className="product-img"
          top
          width="100%"
          src={product.image}
          alt="Product Card Img"
          onClick={handleOnclick}
        />
      </Link>
      <CardTitle>{product.name.slice(0, 20) + ".."}</CardTitle>
      <CardSubtitle>$ {product.price}</CardSubtitle>
      <Button
        className="btn-add-cart"
        style={{ display: product.stock < 1 ? "none" : "inline-block" }}
        size="sm"
        onClick={handleClick}
      >
        Agregar a Carrito
      </Button>
      {product.stock < 1 ? "Sin stock" : null}
    </Card>
  );
};
export default ProductCard;
