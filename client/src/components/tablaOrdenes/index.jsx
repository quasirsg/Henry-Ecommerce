import React from "react";
import { Button, Container, Table } from "reactstrap";
import { GearFill, Trash, Tools } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteOrder } from "../../redux/actions/ordenActions";
import { deleteAllCart, getProductCart } from "../../redux/actions/userActions";

const TablaOrdenes = () => {
  const data = useSelector((state) => state.order.allOrders);
  const dispatch = useDispatch();

  const handleClick = (e, id, userId) => {
    e.preventDefault();
    console.log(userId);
    dispatch(deleteOrder(id, userId));
  };

  return (
    <Container>
      <Table hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Usuario</th>
            <th>
              <GearFill size={17} className="mr-2" />
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="scroll">
          {data.map((item, index) => (
            <tr className="my-auto" key={index}>
              <th>{item.id}</th>
              <td>{item.status}</td>
              <td>{item.userId}</td>
              <td className="p-2">
                <Link
                  to={`/admin/ordenes/${item.id}`} //el id es el ID de Orden
                  className="btn btn-default border btn-sm mr-3"
                >
                  <Tools size={17} />
                </Link>
                <Button
                  color="default"
                  onClick={(e) => handleClick(e, item.id, item.userId)}
                  className="border btn-sm"
                >
                  <Trash id={item.id} size={17} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TablaOrdenes;
