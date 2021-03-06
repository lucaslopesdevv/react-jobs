import React, { useEffect, useState } from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import * as ReactBootStrap from "react-bootstrap";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { Button, Form as BsForm } from "react-bootstrap";

import "../../styles/User.scss";
import { useNavigate, useParams } from "react-router-dom";
import Main from "../Main";
import axios from "axios";

export default function EditJob() {
  const [jobName, setJobName] = useState("");
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");
  const [tipoRecorr, setTipoRecorr] = useState("");
  const [valorRecorr, setValorRecorr] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5500/jobs/${id}`).then((response) => {
      setTimeout(() => {
        setLoading(false);
        response.data.map(
          ({
            nome_job,
            usuario,
            status,
            tipo_recorrencia,
            valor_recorrencia,
          }) => {
            setJobName(nome_job);
            setUser(usuario);
            setStatus(status);
            setTipoRecorr(tipo_recorrencia);
            setValorRecorr(valor_recorrencia);
          }
        );
      }, 500);
    });
  }, []);

  const UserSchema = Yup.object({
    job: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    usuario: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    status: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    tipo_recorr: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    valor_recorr: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  function handleJobChange(e) {
    setJobName(e.target.value);
  }
  function handleUserChange(e) {
    setUser(e.target.value);
  }
  function handleStatusChange(e) {
    setStatus(e.target.value);
  }
  function handleTipoRecorrChange(e) {
    setTipoRecorr(e.target.value);
  }
  function handleValorRecorrChange(e) {
    setValorRecorr(e.target.value);
  }

  function handleSubmitForm() {
    axios
      .put(`http://localhost:5500/updateJob/${id}`, {
        nome_job: jobName,
        usuario: user,
        status: status,
        tipo_recorrencia: tipoRecorr,
        valor_recorrencia: valorRecorr,
      })
      .then((res) => {
        alert("Success");
        navigate("/ListJobs");
      });
  }

  let mainJsx = <ReactBootStrap.Spinner animation="border" />;

  if (!loading) {
    mainJsx = (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">FullStack</Navbar.Brand>
            <Nav className="me-auto">
              <LinkContainer to="/CreateUser">
                <Nav.Link>Usu??rio</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/ListUser">
                <Nav.Link>Lista de usu??rios</Nav.Link>
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
        <Formik
          initialValues={{
            job: jobName,
            usuario: user,
            status: status,
            tipo_recorr: tipoRecorr,
            valor_recorr: valorRecorr,
          }}
          validationSchema={UserSchema}
          enableReinitialize
        >
          {(formik) => (
            <>
              <Form className="d-flex flex-column w-100 border p-5">
                <BsForm>
                  <BsForm.Group className="mb-3">
                    <BsForm.Label htmlFor="name">Job</BsForm.Label>
                    <Field
                      className="form-control"
                      id="job"
                      name="job"
                      placeholder="Digite seu usu??rio"
                      onChange={handleJobChange}
                    />
                    <ErrorMessage name="job" />
                  </BsForm.Group>
                </BsForm>

                <BsForm className="mb-3">
                  <BsForm.Group className="mb-3">
                    <BsForm.Label htmlFor="email">Usu??rio</BsForm.Label>
                    <Field
                      className="form-control"
                      type="user"
                      id="usuario"
                      name="usuario"
                      placeholder="Digite seu usu??rio"
                      onChange={handleUserChange}
                    />
                    <ErrorMessage name="usuario" />
                  </BsForm.Group>
                </BsForm>
                <BsForm className="mb-3">
                  <BsForm.Group className="mb-3">
                    <BsForm.Label htmlFor="senha">Status</BsForm.Label>
                    <Field
                      className="form-control"
                      type="status"
                      id="status"
                      name="status"
                      placeholder="Digite o status"
                      onChange={handleStatusChange}
                    />
                    <ErrorMessage name="status" />
                  </BsForm.Group>
                </BsForm>

                <BsForm className="mb-3">
                  <BsForm.Group className="mb-3">
                    <BsForm.Label htmlFor="telefone">
                      Tipo Recorr??ncia
                    </BsForm.Label>
                    <Field
                      className="form-control"
                      type="text"
                      id="tipo_recorr"
                      name="tipo_recorr"
                      placeholder="Digite o Tipo da Recorr??ncia"
                      onChange={handleTipoRecorrChange}
                    />
                    <ErrorMessage name="telefone" />
                  </BsForm.Group>
                </BsForm>

                <BsForm className="mb-3">
                  <BsForm.Group className="mb-3">
                    <BsForm.Label htmlFor="telefone">
                      Valor Recorr??ncia
                    </BsForm.Label>
                    <Field
                      className="form-control"
                      type="text"
                      id="valor_recorr"
                      name="valor_recorr"
                      placeholder="Digite o Tipo da Recorr??ncia"
                      onChange={handleValorRecorrChange}
                    />
                    <ErrorMessage name="telefone" />
                  </BsForm.Group>
                </BsForm>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmitForm}
                >
                  Submit
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </>
    );
  }

  return (
    <>
      <Main>{mainJsx}</Main>
    </>
  );
}
