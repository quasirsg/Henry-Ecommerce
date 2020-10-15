import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";

// import {
//   Carousel,
//   CarouselItem,
//   CarouselControl,
//   CarouselIndicators,
//   CarouselCaption,
// } from "reactstrap";
import "./producto.css";
import allActions from "../../redux/actions/allActions";

/* ======= Imagen si usamos carousel ====== */

//   img: [
//     {
//       src: "https://mirfitness.com.ar/wp-content/uploads/DSC_9928.jpg",
//       caption: 0,
//       altext: "Image",
//     },
//     {
//       src: "https://mirfitness.com.ar/wp-content/uploads/DSC_9928.jpg",
//       caption: 1,
//       altext: "Image",
//     },
//   ],

const Product = (props) => {
  /* ====== Hooks ======= */
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [animating, setAnimating] = useState(false);
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
  useEffect(() => {
    dispatch(allActions.getOneProduct(id));
  }, []);

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
          <button className="button">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
