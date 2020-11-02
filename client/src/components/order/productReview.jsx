import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { useDispatch } from "react-redux";
import { addReview } from "../../redux/actions/userActions";
import { Form, Col, Button, FormGroup, Label, Input } from "reactstrap";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const ProductReview = ({ product, open }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [textReview, setTextReview] = useState("");

  const onStarClick = (nextValue, prevValue, name) => {
    setRating(nextValue);
  };

  const handleOnChange = (event) => setTextReview(event.target.value);
  const hanldeOnSubmit = (event) => {
    dispatch(
      addReview(product.id, product.linea_order.userId, rating, textReview)
    );
    Toast.fire({
      icon: "success",
      title: "Ha Añadido una review!",
    });
    event.preventDefault();
  };

  return (
    <div>
      <Form onSubmit={hanldeOnSubmit}>
        <Col lg="12">
          <div className="d-flex justify-content-center mt-2">
            <StarRatingComponent
              name="rate1"
              starCount={5}
              emptyStarColor={"#ccc9c9"}
              value={rating}
              onStarClick={onStarClick}
            />
          </div>
          <FormGroup>
            <Label for="exampleText">Cuentanos mas acerca del producto</Label>
            <Input
              onChange={handleOnChange}
              type="textarea"
              name="text"
              id="exampleText"
            />
          </FormGroup>
          <Button
            type="submit"
            color="primary"
            style={{ marginBottom: "2rem" }}
          >
            Enviar Opinion
          </Button>
        </Col>
      </Form>
    </div>
  );
};

export default ProductReview;
