import React, { useEffect } from "react";
import { Card, CardImg, CardTitle, CardSubtitle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./productCard.css";
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct } from "../../redux/actions/productActions";
import {
  addProductCart,
  getProductCart,
} from "../../redux/actions/userActions";
import toast from "../alerts/toast";

const ProductCard = ({ product, userId }) => {
  const dispatch = useDispatch();
  const handleOnclick = () => {
    dispatch(getOneProduct(product.id));
  };
  let productsCarts = useSelector((state) => state.users.carrito);

  useEffect(() => {
    dispatch(getProductCart(userId));
  }, []);

  product.quantity = 1;
  const handleClick = () => {
    let value = true;
    if (!localStorage.token) {
      if (localStorage.cart) {
        productsCarts = JSON.parse(localStorage.getItem("cart"));
      }
    }
    if (productsCarts) {
      productsCarts.forEach((item) => {
        if (item.id === product.id) {
          value = false;
        }
      });
    }
    if (value) {
      dispatch(addProductCart(userId, product));
    } else {
      toast.fire({
        icon: "error",
        title: `El producto ya se encuentra en el carrito`,
      });
    }
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
