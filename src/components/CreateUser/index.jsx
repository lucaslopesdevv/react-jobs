import React, { useEffect, useState } from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Form as BsForm } from "react-bootstrap";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

export default function CreateUser() {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

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

  function handleSubmitForm() {
    const object = {
      nome: user,
      email: email,
      senha: pass,
      telefone: phone,
    };

    axios.post(`http://localhost:5500/createUser`, object).then((res) => {
      alert("Success");
      navigate("/ListUser");
    });
  }

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

  return (
    <>
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
    </>
  );
}
