import React from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import "./ProductCard.css";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // console.log(product);

  return (
    // TODO:Create State and link it to the component
    <Card>
      <CardImg
        className="product-img"
        top
        width="100%"
        src="{product.img}"
        alt="Product Card Img"
      />
      <CardTitle>{product.name}</CardTitle>
      <StarRatings
        rating={4}
        starRatedColor="#6B83FC"
        starDimension="25px"
        starSpacing="6px"
      />
      <p>Reviews: {product.review}</p>
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