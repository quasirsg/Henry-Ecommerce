import React from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import "./ProductCard.css";
import StarRatings from "react-star-ratings";

const productCard = () => {
  return (
    // TODO:Create State and link it to the component
    <Card>
      <CardImg
        className="product-img"
        top
        width="100%"
        src="https://cdn.shopify.com/s/files/1/1618/2767/products/SportSeries_CombatProtein_2lb_ChocolateMilk_view1_650x.jpg?v=1559580836"
        alt="Product Card Img"
      />
      <CardTitle>Product Name</CardTitle>
      <StarRatings
        rating={2.403}
        starRatedColor="#6B83FC"
        starDimension="25px"
        starSpacing="6px"
      />
      <div className="rev-price">
        <p className="review">Reviews: 3</p>
        <CardSubtitle>Precio: 60$</CardSubtitle>
      </div>
      <div className="but-cont">
        <Button className="btn-add-cart" size="sm">
          Agregar a Carrito
        </Button>
      </div>
    </Card>
  );
};
export default productCard;
