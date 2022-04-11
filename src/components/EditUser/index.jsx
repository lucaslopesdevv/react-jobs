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

export default function EditUser({}) {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5500/users/${id}`).then((response) => {
      setTimeout(() => {
        setLoading(false);
        response.data.map(({ nome, email, telefone, senha }) => {
          setUser(nome);
          setEmail(email);
          setPhone(telefone);
          setPass(senha);
        });
      }, 500);
    });
  }, []);

  useEffect(() => {
    console.log(user);
    console.log(email);
    console.log(pass);
    console.log(phone);
  }, [user, email, pass, phone]);

  const UserSchema = Yup.object({
    nome: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    telefone: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    senha: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  function handleUserChange(e) {
    setUser(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePassChange(e) {
    setPass(e.target.value);
  }
  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }

  function handleSubmitForm() {
    axios
      .put(`http://localhost:5500/updateUser/${id}`, {
        nome: user,
        email: email,
        senha: pass,
        telefone: phone,
      })
      .then((res) => {
        alert("Success");
        navigate("/ListUser");
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
        <Formik
          initialValues={{
            name: user,
            email: email,
            senha: pass,
            telefone: phone,
          }}
          validationSchema={UserSchema}
          enableReinitialize
        >
          {(formik) => (
            <>
              <Form className="d-flex flex-column w-100 border p-5">
                <BsForm>
                  <BsForm.Group className="mb-3">
                    <BsForm.Label htmlFor="name">Usuário</BsForm.Label>
                    <Field
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Digite seu usuário"
                      onChange={handleUserChange}
                    />
                    <ErrorMessage name="name" />
                  </BsForm.Group>
                </BsForm>

                <BsForm className="mb-3">
                  <BsForm.Group className="mb-3">
                    <BsForm.Label htmlFor="email">E-mail</BsForm.Label>
                    <Field
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Digite seu usuário"
                      onChange={handleEmailChange}
                    />
                    <ErrorMessage name="email" />
                  </BsForm.Group>
                </BsForm>
                <BsForm className="mb-3">
                  <BsForm.Group className="mb-3">
                    <BsForm.Label htmlFor="senha">Senha</BsForm.Label>
                    <Field
                      className="form-control"
                      type="password"
                      id="senha"
                      name="senha"
                      placeholder="Digite sua senha"
                      onChange={handlePassChange}
                    />
                    <ErrorMessage name="senha" />
                  </BsForm.Group>
                </BsForm>

                <BsForm className="mb-3">
                  <BsForm.Group className="mb-3">
                    <BsForm.Label htmlFor="telefone">Telefone</BsForm.Label>
                    <Field
                      className="form-control"
                      type="phone"
                      id="telefone"
                      name="telefone"
                      placeholder="Digite seu telefone"
                      onChange={handlePhoneChange}
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
