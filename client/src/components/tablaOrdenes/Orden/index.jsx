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
  getOneOrder,
  getOrderById,
  updateStatusOrder,
} from "../../../redux/actions/ordenActions";
import Toast from "../../alerts/toast";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { Row, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const Orden = () => {
  const history = useHistory();
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
    } else if (status === "processing") {
      dispatch(updateStatusOrder(id, status))
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: `Orden en proceso`,
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: `Error: No se puede procesar la orden "`,
          });
        });
    }
  };

  /* =========== Dropdown Button ======== */
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = (e) => {
    setOpen(!dropdownOpen);
  };

  /* =========== Cambio de botones segun el estado==========*/

  const changeStatus = (state) => {
    if (state === "shopping_cart") {
      return (
        <>
          <DropdownItem onClick={() => handleStatus("processing")}>
            Procesar orden
          </DropdownItem>
        </>
      );
    } else if (state === "processing") {
      return (
        <>
          <DropdownItem onClick={() => handleStatus("completed")}>
            Completar orden
          </DropdownItem>
        </>
      );
    }
  };

  const statusButton = (state) => {
    if (state !== "canceled" && state !== "completed") {
      return (
        <>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>Modificar el estado</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleStatus("canceled")}>
                Cancelar orden
              </DropdownItem>
              {changeStatus(orden.status)}
            </DropdownMenu>
          </ButtonDropdown>
        </>
      );
    }
  };

  console.log(orden);

  return (
    <div className="orden-cont">
      <div></div>
      <Row>
        <Button
          className="btn btn-light text-secondary btn-sm float-left"
          onClick={() => history.push("/admin/ordenes")}
        >
          <ArrowLeftCircle size={20} />
        </Button>
      </Row>
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
      {statusButton(orden.status)}
    </div>
  );
};

export default Orden;
