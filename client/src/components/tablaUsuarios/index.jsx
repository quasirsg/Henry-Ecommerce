import React, { useEffect } from "react";
import { Button, Container, Table } from "reactstrap";
import {
  GearFill,
  PersonCheckFill,
  PersonDashFill,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { deleteOrder } from "../../redux/actions/ordenActions";
import { adminActions } from "../../redux/actions/adminActions";
import { getUsers } from "../../redux/actions/userActions";
import Toast from "../../components/alerts/toast";

const TablaUsuarios = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users.data);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleClick = (id, role) => {
    if (role === "client") {
      let newRole = "admin";
      dispatch(adminActions(id, newRole)).then((res) => {
        Toast.fire({
          icon: "success",
          title: "Usuario promovido",
        });
      });
    } else if (role === "admin") {
      let newRole = "client";
      dispatch(adminActions(id, newRole)).then((res) => {
        Toast.fire({
          icon: "success",
          title: "Usuario degradado",
        });
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Usuario ya es administrador",
      });
    }
  };

  return (
    <Container>
      <Table hover responsive className="table-sm">
        <thead>
          <tr>
            <th>id</th>
            <th>nombre</th>
            <th>Role</th>
            <th>
              <GearFill size={17} className="mr-2" />
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="scroll">
          {users &&
            users.map((item, index) => (
              <tr className="my-auto" key={index}>
                <th>{item.id}</th>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td className="p-2">
                  <Button
                    color="default"
                    onClick={() => handleClick(item.id, item.role)}
                    className="border btn-sm"
                  >
                    {item.role === "admin" ? (
                      <PersonDashFill id={item.id} size={17} />
                    ) : (
                      <PersonCheckFill id={item.id} size={17} />
                    )}
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TablaUsuarios;
