import React, { useState } from "react";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Collapse,
} from "reactstrap";
import "./order.css";
import ProductReview from "./productReview";

const Order = ({ products, status, hasReviews, key }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleButton = () => setIsOpen(!isOpen);
  const toggle = () => setModal(!modal);
  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  const availableReviews = (id) => {
    if (status === "completed" || status === "processing") {
      let value = true;
      hasReviews.forEach((review) => {
        if (id === review.productId) {
          value = false;
        }
      });
      return value;
    }
  };

  return (
    <Col lg="12">
      <div className="order__card">
        <div className="order__content">
          {Array.isArray(products) ? (
            <>
              {products.length > 1 ? (
                <div className="order__images">
                  {products.map((product) => (
                    <div className="order__img">
                      <img
                        className="order__image"
                        src={product.image}
                        alt={product.title}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Row>
                  <Col lg="4">
                    <div className="order__images">
                      <div className="order__img">
                        <img
                          className="order__image"
                          src={products[0].image}
                          alt={products[0].name}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="8" className="my-auto">
                    <div className="order__title">{products[0].name}</div>
                    <div className="order__cuantity">
                      {products[0].linea_order.quantity > 1
                        ? "$ " +
                          products[0].price +
                          " x" +
                          products[0].linea_order.quantity +
                          " unidades"
                        : "$ " +
                          products[0].price +
                          " x" +
                          products[0].linea_order.quantity +
                          " unidad"}
                    </div>
                  </Col>
                </Row>
              )}
              <div className="order__buttons">
                <Button color="info" onClick={toggle}>
                  Ver detalle
                </Button>
              </div>
              <Modal isOpen={modal} toggle={toggle} className="order__modal">
                <ModalHeader toggle={toggle} close={closeBtn}>
                  Productos Comprados
                </ModalHeader>
                <ModalBody>
                  {products.map((product) => (
                    <>
                      <Order
                        key={product.id}
                        products={product}
                        status={status}
                      />
                      {availableReviews(product.id) ? (
                        <>
                          <Button
                            color="warning"
                            style={{ margin: "0 10px" }}
                            onClick={toggleButton}
                          >
                            Opinar sobre el producto
                          </Button>
                          <Collapse isOpen={isOpen}>
                            <ProductReview product={product} open={isOpen} />
                          </Collapse>
                        </>
                      ) : (
                        <Button color="secondary" style={{ margin: "0 10px" }}>
                          Comentario Recibido
                        </Button>
                      )}
                    </>
                  ))}
                </ModalBody>
              </Modal>
            </>
          ) : (
            <Col lg="12">
              <Row>
                <Col lg="4">
                  <div className="order__images">
                    <div className="order__img">
                      <img
                        className="order__image"
                        src={products.image}
                        alt={products.name}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="8">
                  <div className="order__title">{products.name}</div>
                  <div className="order__cuantity">
                    {products.linea_order.quantity > 1
                      ? "$ " +
                        products.price +
                        " x" +
                        products.linea_order.quantity +
                        " unidades"
                      : "$ " +
                        products.price +
                        " x" +
                        products.linea_order.quantity +
                        " unidad"}
                  </div>
                </Col>
              </Row>
            </Col>
          )}
        </div>
      </div>
    </Col>
  );
};

export default Order;
