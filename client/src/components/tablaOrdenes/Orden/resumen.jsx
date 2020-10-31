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
        <Table hover responsive className="table-sm">
          <thead>
            <tr>
              <th>N° Orden</th>
              <th>Cantidad de productos</th>
              <th>Total</th>
              <th>Estado de la orden</th>
            </tr>
          </thead>
          <tbody className="scroll">
            <tr>
              <th>{id}</th>
              <th>{totProducts}</th>
              <th>{total}</th>
              <th>{orden.status}</th>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ResumeOreder;
