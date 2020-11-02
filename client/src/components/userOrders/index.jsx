import React, { useEffect } from "react";
import Order from "../order";
import {
  getUsersOrders,
  getReviewsById,
} from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";

const UserOrders = ({ id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersOrders(id));
    dispatch(getReviewsById(id));
  }, []);

  const orders = useSelector((state) => state.users.orders);
  const userReviews = useSelector((state) => state.users.reviews);

  let orderUser = [];
  orders.forEach((orden) => {
    if (id === orden.userId) {
      orderUser.push(orden);
    }
  });

  return (
    <div className="userOrders">
      <Col>
        <h2
          style={{ fontWeight: "bold", color: "#424242", marginBottom: "2rem" }}
        >
          Mis Pedidos
        </h2>
      </Col>
      {orderUser.length > 0 ? (
        orderUser.map((orden) => (
          <Order
            key={orden.id}
            products={orden.products}
            userId={orden.userId}
            status={orden.status}
            hasReviews={userReviews}
          />
        ))
      ) : (
        <Col>No encontramos ordenes!</Col>
      )}
    </div>
  );
};

export default UserOrders;
