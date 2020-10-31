import React from "react";
import { Button, Container, Table } from "reactstrap";
import { GearFill, Trash, Tools } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/actions/productActions";

const InventoryTable = () => {
  const data = useSelector((state) => state.products.allProducts);
  const dispatch = useDispatch();

  const handleClick = (e, id, name) => {
    e.preventDefault();
    dispatch(deleteProduct(id, name));
  };

  data.map((item, index) => {
    if (index === 0) {
      console.log(item.image);
    }
  });

  return (
    <Container>
      <Table hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Categorias</th>
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
              <td>{item.stock} uds.</td>
              <td>{item.description.slice(0, 15) + ".."}</td>
              <td>$ {item.price}</td>
              <td>
                <img
                  src={item.image}
                  style={{ width: "3rem", height: "3rem" }}
                  // alt={item.name}
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
