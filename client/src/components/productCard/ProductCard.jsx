import React from "react";
import { Card, CardImg, CardTitle, CardSubtitle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./productCard.css";
import { useDispatch } from "react-redux";
import { getOneProduct } from "../../redux/actions/productActions";
import { addProductCart } from "../../redux/actions/userActions";

const ProductCard = ({ product, userId }) => {
  const dispatch = useDispatch();
  const handleOnclick = () => {
    dispatch(getOneProduct(product.id));
  };

  // if (localStorage.token) {
  //   let user = localStorage.getItem("token");
  //   var userId = user.id;
  // } else {
  //   var userId = 1;
  // }

  product.quantity = 1;
  const handleClick = () => {
    dispatch(addProductCart(userId, product));
  };

  return (
    // TODO:Create State and link it to the component
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
      <CardTitle>{product.name}</CardTitle>
      <CardSubtitle>$ {product.price}</CardSubtitle>
      <Button className="btn-add-cart" size="sm" onClick={handleClick}>
        Agregar a Carrito
      </Button>
    </Card>
  );
};
export default ProductCard;
