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

export default function ListJobs() {
  const [jobs, setJob] = useState([]);
  const [idJob, setIdJob] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5500/jobs").then((response) => {
      setJob(response.data);
    });
  }, []);

  useEffect(() => {
    if (idJob) {
      axios
        .delete(`http://localhost:5500/deleteJob/${idJob}`)
        .then((response) => {
          window.location.reload();
        });
    }
  }, [idJob]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.idjob,
      sortable: true,
    },
    {
      name: "Job",
      selector: (row) => row.nome_job,
      sortable: true,
    },
    {
      name: "Usuário",
      selector: (row) => row.usuario,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Tipo Recorrência",
      selector: (row) => row.tipo_recorrencia,
      sortable: true,
    },
    {
      name: "Valor Recorrência",
      selector: (row) => row.valor_recorrencia,
      sortable: true,
    },
    {
      name: "Ações",
      cell: (row, index) => {
        return (
          <>
            <Button onClick={() => navigate(`/editJob/${row.idjob}`)}>
              <i className="bi bi-pencil p-3"></i>
            </Button>
            <Button onClick={() => setIdJob(row.idjob)}>
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

      <DataTable columns={columns} data={jobs} />
    </>
  );
}
