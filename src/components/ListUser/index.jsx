import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

import { Button } from "react-bootstrap";

import "../../styles/User.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function User() {
  const [user, setUser] = useState([]);
  const [idUser, setIdUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5500/users").then((response) => {
      setUser(response.data);
      // newObject.map(({ email, nome, telefone }) => {
      //   console.log(telefone);
      // });
    });
  }, []);

  useEffect(() => {
    if (idUser) {
      axios
        .delete(`http://localhost:5500/deleteUser/${idUser}`)
        .then((response) => {
          console.log(response);
          window.location.reload();
        });
    }
  }, [idUser]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.iduser,
      sortable: true,
    },
    {
      name: "Nome",
      selector: (row) => row.nome,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Telefone",
      selector: (row) => row.telefone,
      sortable: true,
    },
    {
      name: "Ações",
      cell: (row, index) => {
        return (
          <>
            <Button onClick={() => navigate(`/editUser/${row.iduser}`)}>
              <i className="bi bi-pencil p-3"></i>
            </Button>
            <Button onClick={() => setIdUser(row.iduser)}>
              <i className="bi bi-trash p-3"></i>
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">FullStack</Navbar.Brand>
          <Nav className="me-auto">
            <LinkContainer to="/CreateUser">
              <Nav.Link>Usuário</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ListUser">
              <Nav.Link>Lista de usuários</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/CreateJob">
              <Nav.Link>Jobs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ListJobs">
              <Nav.Link>Lista de Jobs</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>

      <DataTable columns={columns} data={user} />
    </>
  );
}
