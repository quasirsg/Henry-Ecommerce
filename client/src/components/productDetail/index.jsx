import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import { addProductCart } from "../../redux/actions/userActions";
import "./producto.css";
import { createOrder } from "../../redux/actions/cartActions";

const Product = (props) => {
  const [rating, setRating] = useState(0);

  let { id } = useParams();

  /* ======== Star Rating Handle ======== */
  const changeRating = (newRating, name) => {
    setRating({
      rating: newRating,
    });
  };
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
  return (
    <div className="productContainer">
      {/* <h1>{id}</h1> */}
      {/* <Carousel
        className="productImg"
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators
          items={props.img}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel> */}
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
              rating={rating}
              starRatedColor="blue"
              changeRating={() => changeRating}
              starHoverColor="yellow"
              starDimension="30px"
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
  );
};

export default Product;
