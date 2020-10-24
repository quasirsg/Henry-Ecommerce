import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import { addProductCart } from "../../redux/actions/userActions";
import "./producto.css";
import Review from "../review/index";
import { Col, Row, Container } from "reactstrap";

const Product = () => {
  let { id } = useParams();

  /* ======== Star Rating Handle ======== */
  // const changeRating = (newRating, name) => {
  //   setRating({
  //     rating: newRating,
  //   });
  // };
  /* ========= Redux========== */
  const product = useSelector((state) => state.products.productDetail);
  const dispatch = useDispatch();
  product.quantity = 1; //agrego una cantidad por default

  const handleOnClick = () => {
    dispatch(addProductCart(1, product));
    // localStorage.setItem("user", userId.id);
    // dispatch(getUserOrder(userId.id));
    // console.log(userId.id);
  };

  //agrego provisoriamente
  let reviews = [];

  return (
    <Container fluid={true} className="productDetail py-4 my-4">
      <Row className="productDeatil__content">
        <Col lg="8">
          <div className="prod-img">
            <img src={product.image} alt="" />
          </div>
        </Col>
        <Col lg="4">
          <div className="productInfo">
            <div className="rating-reviews">
              <StarRatings
                // rating={average !== null ? average : 5}
                starRatedColor="yellow"
                starHoverColor="yellow"
                starDimension="16px"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <h2 className="productTitle">{product.name}</h2>
            <p className="inforPrice">${product.price}</p>
            <h6 className="productStock">
              {product.stock > 0
                ? "Stock Disponible: " + product.stock
                : "Producto No Disponible"}
            </h6>
            <div
              className={
                product.stock > 0
                  ? "button-container"
                  : "button-container-disabled"
              }
            >
              <button
                onClick={() => console.log("action dispath buy product")}
                className={"button btn-block"}
              >
                Comprar Ahora
              </button>
              <button
                onClick={handleOnClick}
                className={"button-secundary btn-block"}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <Col lg="12">
        <div className="infoCardDescriptionTitle">Descripcion:</div>
        <p className="infoCardDescription">{product.description}</p>
      </Col>
      <Col lg="12">
        <div className="infoCardDescriptionTitle">Reviews:</div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Review
              userImage={review.user.image}
              userName={review.user.name}
              points={review.points}
              description={review.description}
            />
          ))
        ) : (
          <div className="warning-alert">
            Lo sentimos este producto no cuenta con Reviews!
          </div>
        )}
      </Col>
    </Container>
  );
};

export default Product;
