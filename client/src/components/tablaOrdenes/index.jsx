import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "reactstrap";
import { GearFill, Trash, Tools } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteOrder, getOrders } from "../../redux/actions/ordenActions";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { getOneUser } from "../../redux/actions/userActions";

const TablaOrdenes = () => {
  const dispatch = useDispatch();
  /* ==== Traemos todas las ordenes ====== */
  const allOrders = useSelector((state) => state.order.allOrders);
  const prueb = useSelector((state) => state);

  const [data, setData] = useState(allOrders);
  const [click, setClick] = useState(null);
  let orders;
  console.log(prueb);
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  /* ====DropDown Button filtrado por categoria ===== */
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  /* ====== Delete one order ======= */
  const handleClick = (e, id, userId) => {
    // e.preventDefault();
    dispatch(deleteOrder(id, userId));
  };

  /* ======== Filtrado por estado de la orden ======== */
  const filt = (status) => {
    let orderfilter = allOrders.filter((item) => item.status === status);
    return orderfilter;
  };
  const setStatus = (status) => {
    if (status !== "allOrders") {
      let statusChanged = filt(status);
      setData(statusChanged);
      setClick(1);
    } else {
      setData(allOrders);
      setClick(null);
    }
  };

  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Filtrar por estado</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setStatus("shopping_cart")}>
            Creada
          </DropdownItem>
          <DropdownItem onClick={() => setStatus("processing")}>
            En proceso
          </DropdownItem>
          <DropdownItem onClick={() => setStatus("completed")}>
            Completada
          </DropdownItem>
          <DropdownItem onClick={() => setStatus("canceled")}>
            Cancelada
          </DropdownItem>
          <DropdownItem onClick={() => setStatus("allOrders")}>
            Todas las ordenes
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
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
            {
              (click === null ? (orders = allOrders) : (orders = data),
              orders.map((item) => (
                <tr className="my-auto" key={item.id}>
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
              )))
            }
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TablaOrdenes;
