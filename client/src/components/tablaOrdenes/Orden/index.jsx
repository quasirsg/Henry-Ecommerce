import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./orden.css";
import {
  getOrderById,
  updateStatusOrder,
} from "../../../redux/actions/ordenActions";
import Toast from "../../alerts/toast";

const Orden = () => {
  /* ===== Redux ====== */
  const dispatch = useDispatch();
  const orden = useSelector((state) => state.order.orderDetail);
  // const id = orden.id;
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderById(id));
  }, []);

  /* ====== Cambiar estado: cancelado, completado ======*/
  const handleStatus = (status) => {
    if (status === "canceled") {
      dispatch(updateStatusOrder(id, status))
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: `Se cancelo la orden`,
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: `Error: No se pudo cancelar "`,
          });
        });
    } else if (status === "completed") {
      dispatch(updateStatusOrder(id, status))
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: `Se completo la orden`,
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: `Error: No se pudo completar la orden "`,
          });
        });
    }
  };

  /* =========== Dropdown Button ======== */
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = (e) => {
    setOpen(!dropdownOpen);
  };

  return (
    <div className="orden-cont">
      <div></div>
      <Container>
        <Table hover responsive className="table-sm">
          <thead>
            <tr>
              <p className="text-center">Estado de la Orden: {orden.status}</p>
            </tr>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Cantidad</th>
              <th>Sub-Total</th>
            </tr>
          </thead>
          <tbody className="scroll">
            {orden.products &&
              orden.products.map((item, index) => (
                <tr className="my-auto" key={index}>
                  <th>{item.id}</th>
                  <td>{item.name.slice(0, 15) + ".."}</td>
                  <td>$ {item.price}</td>
                  <td>
                    <img
                      src={item.image}
                      style={{ width: "3rem", height: "3rem" }}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.linea_order.quantity}</td>
                  <td>$ {item.linea_order.total}</td>
                  <td className="p-2"></td>
                </tr>
              ))}
          </tbody>
          <tbody></tbody>
        </Table>
      </Container>
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Modificar el estado</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleStatus("canceled")}>
            Cancelar orden
          </DropdownItem>
          <DropdownItem onClick={() => handleStatus("completed")}>
            Completar orden
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
};

export default Orden;
