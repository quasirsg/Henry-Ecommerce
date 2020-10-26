import React, {useEffect} from "react";
import { Button, Container, Table } from "reactstrap";
import { GearFill, Trash, Tools, PersonCheckFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { deleteOrder } from "../../redux/actions/ordenActions";
import { adminActions } from "../../redux/actions/adminActions";
import { getUsers } from "../../redux/actions/userActions";

const TablaUsuarios = () => {
    const dispatch= useDispatch();
    const users=useSelector(state=> state.users.users.data);
    console.log(users);

useEffect(()=> {
    dispatch(getUsers())
}, [])

  const handleClick = (e, id, item) => {
    e.preventDefault();
    dispatch(adminActions(id)); 
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
          {users && users.map((item, index) => (
            <tr className="my-auto" key={index}>
              <th>{item.id}</th>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td className="p-2">
                <Button
                  color="default"
                  onClick={(e) => handleClick(e, item.id, item)}
                  className="border btn-sm"
                >
                  <PersonCheckFill id={item.id} size={17} />
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
