import React from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  console.log(product);

  return (
    // TODO:Create State and link it to the component
    <Card>
      <CardImg
        className="product-img"
        top
        width="100%"
        src={product.image}
        alt="Product Card Img"
      />
      <CardTitle>{product.name}</CardTitle>
      <CardSubtitle>Precio: {product.price}</CardSubtitle>
      <Link to={`/product/${product.id}`}>
        <Button className="btn-add-cart" size="sm">
          Agregar a Carrito
        </Button>
      </Link>
    </Card>
  );
};
export default ProductCard;
