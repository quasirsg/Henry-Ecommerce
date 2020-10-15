import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "reactstrap";
import { GearFill, Trash, Tools } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import apiCall from "../../../redux/api";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../redux/actions/allActions";

const InventoryTable = () => {
  /* Redux */
  const data = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.getProducts());
  }, []);

  const handleClick = (e, id, name) => {
    e.preventDefault();
    Swal.fire({
      html: `<h5>¿Desea eliminar ${name}?<h5/>`,
      width: "30%",
      text: "No podrás revertir esta cambio!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        icon: "w-25",
        confirmButton: "btn btn-sm btn-primary",
        cancelButton: "btn btn-sm btn-default border",
      },
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        apiCall(`/products/${id}`, null, null, "delete").then((response) => {
          Swal.fire("Eliminado!", "El registro fue eliminado.", "success");
        });
      }
    });
  };

  return (
    <Container>
      <Table hover responsive className="table-sm">
        <thead>
          <tr>
            {data.length
              ? Object.keys(data[0]).map((item, index) => (
                  <th key={index}>{item}</th>
                ))
              : ""}
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
              <td>{item.name.slice(0, 15) + ".."}</td>
              <td>{item.stock}</td>
              <td>{item.description.slice(0, 15) + ".."}</td>
              <td>{item.price}</td>
              <td>
                <img
                  src={item.image}
                  style={{ width: "3rem", height: "3rem" }}
                  alt={item.name}
                />
              </td>
              <td>{item.categories.map((item) => item.name).join(" , ")}</td>
              <td className="p-2">
                <Link
                  to={`/admin/product/${item.id}`}
                  className="btn btn-default border btn-sm mr-3"
                >
                  <Tools size={17} />
                </Link>
                <Button
                  color="default"
                  onClick={(e) => handleClick(e, item.id, item.name)}
                  className="border btn-sm"
                >
                  <Trash data-name={item.name} id={item.id} size={17} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default InventoryTable;
