import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import {
  addProductCart,
  getProductCart,
} from "../../redux/actions/userActions";
import { getReviews } from "../../redux/actions/productActions";
import Review from "../review/index";
import { Col, Row, Container, Button } from "reactstrap";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import allActions from "../../redux/actions/allActions";
import "./producto.css";
import { useHistory } from "react-router-dom";
import { verifySession } from "../../redux/actions/jwtUsers";
import toast from "../alerts/toast";

const Product = () => {
  const history = useHistory();
  let { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.userDetail);
  let productsCarts = useSelector((state) => state.users.carrito);

  useEffect(() => {
    dispatch(verifySession());
    dispatch(allActions.getOneProduct(id));
    dispatch(getReviews(id));
    dispatch(getProductCart(userId));
  }, [id]);

  const product = useSelector((state) => state.products.productDetail);
  const { average, reviews } = useSelector(
    (state) => state.products.productReviews
  );

  product.quantity = 1; //agrego una cantidad por default
  if (localStorage.token) {
    var userId = user.id;
  }

  const handleOnClick = () => {
    let value = true;
    if (!localStorage.token) {
      if (localStorage.cart) {
        productsCarts = JSON.parse(localStorage.getItem("cart"));
      }
    }
    if (productsCarts) {
      productsCarts.forEach((item) => {
        if (item.id === product.id) {
          value = false;
        }
      });
    }
    if (value) {
      dispatch(addProductCart(userId, product));
    } else {
      toast.fire({
        icon: "error",
        title: `El producto ya se encuentra en el carrito`,
      });
    }
  };

  return (
    <Container fluid={true} className="productDetail py-4 my-4">
      <Row>
        <Button
          className="btn btn-light text-secondary btn-sm float-left"
          onClick={() => history.push("/products")}
        >
          <ArrowLeftCircle size={20} />
        </Button>
      </Row>
      <Row className="productDeatil__content">
        <Col lg="8">
          <div className="prod-img">
            <img src={product.image} alt="" />
          </div>
        </Col>
        <Col lg="4">
          <div className="productInfo">
            <h2 className="productTitle">{product.name}</h2>
            <div className="rating-reviews">
              <StarRatings
                rating={average !== null ? average : 5}
                starRatedColor="blue"
                starHoverColor="yellow"
                starDimension="16px"
                numberOfStars={5}
                name="rating"
              />
              <div className="rating-reviews-count">
                {reviews.length > 0 && reviews.length + " Opiniones"}
              </div>
            </div>
            <p className="inforPrice">${product.price}</p>
            <h6 className="productStock">
              {product.stock > 0 ? "Stock Disponible" : "Producto sin Stock"}
            </h6>
            <div
              className={
                product.stock > 0
                  ? "button-container"
                  : "button-container-disabled"
              }
            >
              <button onClick={handleOnClick} className={"button btn-block"}>
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
        <div className="infoCardDescriptionTitle">Opiniones:</div>
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
            Lo sentimos este producto no cuenta con opiniones de otros usuarios!
          </div>
        )}
      </Col>
    </Container>
  );
};

export default Product;
