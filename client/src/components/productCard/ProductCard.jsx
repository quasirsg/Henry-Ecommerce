import React from "react";
import { Card, CardImg, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import "./productCard.css";
import { useDispatch } from "react-redux";
import { getOneProduct } from "../../redux/actions/productActions";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const handleOnclick = () => {
    dispatch(getOneProduct(product.id));
    console.log(product);
  };
  return (
    // TODO:Create State and link it to the component
    <Card>
      <Link to={`/product/${product.id}`} >
        <CardImg
          className="product-img"
          top
          width="100%"
          src={product.image}
          alt="Product Card Img"
        />
      </Link>
      <CardTitle>{product.name}</CardTitle>
      <CardSubtitle>$ {product.price}</CardSubtitle>
      {/* <Link to={`/product/${product.id}`}>
        <Button className="btn-add-cart" size="sm">
          Agregar a Carrito
        </Button>
      </Link> */}
    </Card>
  );
};
export default ProductCard;
