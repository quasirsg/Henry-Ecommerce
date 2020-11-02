import React, { useEffect } from "react";
import { Button, Container, Table } from "reactstrap";
import {
  GearFill,
  PersonCheckFill,
  PersonDashFill,
} from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { adminActions } from "../../redux/actions/adminActions";
import { getUsers } from "../../redux/actions/userActions";

const TablaUsuarios = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleClick = (id, role, item) => {
    if (role === "client") {
      let newRole = "admin";
      let currentRole = "client";
      dispatch(adminActions(id, currentRole, newRole, item));
    } else if (role === "admin") {
      let newRole = "client";
      let currentRole = "admin";
      dispatch(adminActions(id, currentRole, newRole, item));
    }
  };

  return (
    <Container>
      <Table hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
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
                    onClick={() => handleClick(item.id, item.role, item)}
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
