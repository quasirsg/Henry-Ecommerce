import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import { addProductCart } from "../../redux/actions/cartActions";
import "./producto.css";
import allActions from "../../redux/actions/allActions";
import { getReviews } from '../../redux/actions/productActions';
import Review from '../review/index';
import { Col, Row, Container } from 'reactstrap';

const Product = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.getOneProduct(id));
    dispatch(getReviews(id));

  }, [id]);
  const product = useSelector((state) => state.products.productDetail);
  const { average, reviews } = useSelector(state => state.products.productReviews);

  const handleOnClick = () => {
    dispatch(addProductCart(product, 1));
  };

  return (
    <Container
      fluid={true}
      className="productDetail py-4 my-4"
    >
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
                rating={average !== null ? average : 5}
                starRatedColor="yellow"
                starHoverColor="yellow"
                starDimension="16px"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <h2 className="productTitle">{product.name}</h2>
            <p className="inforPrice">${product.price}</p>
            <h6
              className="productStock"
            >
              {product.stock > 0 ? 'Stock Disponible: ' + product.stock : 'Producto No Disponible'}
            </h6>
            <div className="button-container">
              <button
                onClick={() => console.log('has hecho click xD')}
                className={product.stock > 0 ? "button btn-block" : 'button-disabled btn-block'}
              >
                Comprar Ahora
              </button>
              <button
                onClick={handleOnClick}
                className={product.stock > 0 ? "button-secundary btn-block" : 'button-disabled btn-block'}
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
        {reviews.length > 0
          ?
          reviews.map(review => (
            <Review
              userImage={review.user.image}
              userName={review.user.name}
              points={review.points}
              description={review.description}
            />
          ))
          :
          <div className="warning-alert">
            Lo sentimos este producto no cuenta con Reviews!
          </div>
        }
      </Col>

    </Container >
  );
};

export default Product;
