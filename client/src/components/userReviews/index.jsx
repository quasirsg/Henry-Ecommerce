import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsById } from "../../redux/actions/userActions";
import { Container, Col } from "reactstrap";
import Review from "../review";

const UserReviews = ({ id }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviewsById(id));
  }, []);

  const reviews = useSelector((state) => state.users.reviews);
  const reviewsProduct = useSelector((state) => state.products.allProducts);

  return (
    <Container fluid={true}>
      <h2
        style={{ fontWeight: "bold", color: "#424242", marginBottom: "2rem" }}
      >
        Mis reviews!
      </h2>
      {reviews.map((review) => (
        <Review
          key={review.id}
          userImage={review.user.image}
          userName={review.user.name}
          points={review.points}
          description={review.description}
          productId={review.productId}
        />
      ))}
    </Container>
  );
};

export default UserReviews;
