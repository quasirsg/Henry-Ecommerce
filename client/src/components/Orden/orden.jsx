import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../redux/actions/allActions";
import { Link } from "react-router-dom";
import {
  GearFill,
  Trash,
  Tools,
  Dash,
  Plus,
  CartCheckFill,
  CartXFill,
} from "react-bootstrap-icons";
import Swal from "sweetalert2";
import "./orden.css";

/* Lista de productos, id prducto, precio de cada producto, cantidad de cada producto, Total */

const Orden = () => {
  // const data=useSelector(state=> state);
  const dispatch = useDispatch();
  // console.log(data)
  useEffect(() => {
    //ver ruta getOrderCart
    // dispatch(allActions.getOrderCart())
  }, []);

  const [data, setData] = useState({
    cart_id: 1,
    products: [
      {
        product_id: 1,
        name: "producto-1",
        price: "120",
        quantity: 2,
      },
      {
        product_id: 2,
        name: "producto-2",
        price: "140",
        quantity: 1,
      },
      {
        product_id: 3,
        name: "producto-3",
        price: "250",
        quantity: 3,
      },
    ],
  });

  const handleClick = (e, id, name) => {
    //Debe eliminar el producto del carrito
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
      // if (result.isConfirmed) {
      //   apiCall(`/products/${id}`, null, null, "delete").then((response) => {
      //     Swal.fire("Eliminado!", "El registro fue eliminado.", "success");
      //   });
      // }
      alert("producto eliminado");
    });
  };

  function quant(e, type, quantity) {
    //Debería modificarse para incrementar el numero de productos
    // e.preventDefault();
    let sum = quantity;
    if (type === "increment") return sum++;
    dispatch(); //->Agregar producto en 1 unidad
    if (type === "decrement") return sum--;
    dispatch(); //->Elminar producto en 1 unidad
  }

  function total() {
    let sum = 0;
    data.products.forEach((item) => {
      sum += item.quantity * item.price;
    });
    return (
      <tr>
        <th>{""}</th>
        <th>TOTAL</th>
        <th>$ {sum}</th>
        <th>{""}</th>
        <Button color="default" className="border btn-sm">
          <CartXFill size={17} /> Cancelar
        </Button>

        <Button color="default" className="border btn-sm">
          <CartCheckFill size={17} /> Continuar
        </Button>
      </tr>
    );
  }
  return (
    <div className="orden-cont">
      <Container>
        <Table hover responsive className="table-sm">
          <thead>
            <tr>
              {data.products.length
                ? Object.keys(data.products[0]).map((item, index) => {
                    return <th key={index}>{item}</th>;
                  })
                : ""}
              <th>
                <GearFill size={17} className="mr-2" />
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="scroll">
            {data.products.map((item, index) => (
              <tr className="my-auto" key={index}>
                <th>{item.product_id}</th>
                <td>{item.name.slice(0, 15) + ".."}</td>
                <td>$ {item.price}</td>
                <td>
                  {item.quantity}{" "}
                  <Dash
                    onClick={(e) => {
                      let type = "decrement";
                      quant(e, type, item.quantity);
                    }}
                  />
                  <Plus
                    onClick={(e) => {
                      let type = "increment";
                      quant(e, type, item.quantity);
                    }}
                  />
                </td>
                <td className="p-2">
                  <Button
                    color="default"
                    onClick={(e) => handleClick(e, item.product_id, item.name)}
                    className="border btn-sm"
                  >
                    <Trash data-name={item.name} id={item.id} size={17} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tbody>{data.products.length ? total() : ""}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Orden;
