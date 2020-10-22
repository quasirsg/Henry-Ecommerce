import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import { addProductCart } from "../../redux/actions/cartActions";
import "./producto.css";
import allActions from "../../redux/actions/allActions";
import { getReviews } from '../../redux/actions/productActions';
import Review from '../review/index';
import { Container } from 'reactstrap';

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
  console.log(average);
  return (
    <div>
      <div className="productContainer">
        <div className="prod-img">
          <img src={product.image} alt="" />
        </div>
        <div className="productInfo">
          <div className="title-price">
            <h2 className="productTitle">{product.name}</h2>
            <p className="inforPrice">${product.price}</p>
          </div>

          <div className="desc-rating">
            <p className="infoCardDescription">{product.description}</p>
            <div className="rating-reviews">
              <StarRatings
                rating={1}
                starRatedColor="yellow"
                starHoverColor="yellow"
                starDimension="16px"
                numberOfStars={5}
                name="rating"
              />
              <p>{product.reviews} reviews</p>
            </div>
          </div>
          <div className="button-container">
            <button onClick={handleOnClick} className="button">
              Add To Cart
          </button>
          </div>
        </div>
      </div>
      <Container
        fluid={true}
        className="py-4"
      >
        {reviews.map(review => (
          <Review
            userImage={review.user.image}
            userName={review.user.name}
            points={review.points}
            description={review.description}
          />
        ))}
      </Container>
    </div>
  );
};

export default Product;
