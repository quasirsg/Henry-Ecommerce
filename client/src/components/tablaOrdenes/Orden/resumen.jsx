import React from "react";
import { Container, Table } from "reactstrap";

const ResumeOreder = ({ orden, id }) => {
  let totProducts = 0;
  let total = 0;
  if (orden.products) {
    totProducts = orden.products.length;
    orden.products.forEach((products) => {
      return (total += products.linea_order.total);
    });
  }

  return (
    <div className="orden-cont">
      <Container>
        <Table hover responsive>
          <thead>
            <tr>
              <th>N° Orden</th>
              <th>Estado</th>
              <th>N° Productos</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{id}</th>
              <th>{orden.status}</th>
              <th>{totProducts}</th>
              <th>{total}</th>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ResumeOreder;
