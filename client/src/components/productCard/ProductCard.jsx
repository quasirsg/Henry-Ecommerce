import React from "react";
import { Card, CardImg, CardTitle, CardSubtitle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./productCard.css";
import "./style.css";
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
  console.log(product);
  return (
    // TODO:Create State and link it to the component
    <div id="container">
      <ul className="showcase">
        <li className="thumb1">
          <a href={`/product/${product.id}`}>
            <img
              src={product.image}
              width="500"
              height="374"
              alt="Product-image"
              onClick={handleOnclick}
            />
            <h3>
              {product.name.slice(0, 20) + ".."}
              <i onClick={handleClick}>+</i>
            </h3>
            <p>
              {" "}
              $ {product.price} <br /> {product.description}
            </p>
          </a>
        </li>
      </ul>
    </div>

    // <Card>
    //   <Link to={`/product/${product.id}`}>
    //     <CardImg
    //       className="product-img"
    //       top
    //       width="100%"
    //       src={product.image}
    //       alt="Product Card Img"
    //       onClick={handleOnclick}
    //     />
    //   </Link>
    //   <CardTitle>{product.name.slice(0, 20) + ".."}</CardTitle>
    //   <CardSubtitle>$ {product.price}</CardSubtitle>
    //   <Button className="btn-add-cart" size="sm" onClick={handleClick}>
    //     Agregar a Carrito
    //   </Button>
    // </Card>
  );
};
export default ProductCard;
