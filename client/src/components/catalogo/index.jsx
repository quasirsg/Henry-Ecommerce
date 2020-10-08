import React, { useState } from "react";
import Category from "../categoria";
import ProductCard from "../ProductCard/ProductCard";
// import { Container, Row, Col } from "reactstrap";
import "./Catalogo.css";
import data from "./data"; // Provisorio

const Catalogue = (props) => {
  // const [data, setData] = useState([]);
  //TODO: cuadrar responsive
  return (
    <div className="container">
      <Category />

      <div className="catalogo">
        {data.fit.map((fit) => {
          return <ProductCard business={fit} key={fit.id} />;
        })}
      </div>
    </div>

    // <Container className="catalogo">
    //   <Row className="categoria">
    //     <Col sm="3">
    //       <Category />
    //     </Col>
    //     <Col sm="9">
    //       <Row>
    //         <Col className="products">
    //           {data.fit.map((fit) => (
    //             <Container>
    //               <Row>
    //                 <Col>
    //                   <ProductCard fit={fit} className="product" />
    //                 </Col>
    //               </Row>
    //             </Container>
    //           ))}
    //         </Col>
    //       </Row>
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default Catalogue;
