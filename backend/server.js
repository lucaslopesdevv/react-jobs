const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
require("dotenv/config");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
app.use(cors());
app.use(express.json());

//Rota de consulta de usuários
app.get("/users", (req, res) => {
  let SQL = "SELECT * FROM users";
  db.query(SQL, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

//Rota de consulta de usuário por ID
app.get("/users/:id", (req, res) => {
  let { id } = req.params;
  let SQL = `SELECT * FROM users WHERE iduser=${id}`;

  db.query(SQL, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });

  console.log(req);
});

//Rota de criação de usuários
app.post("/createUser", (req, res) => {
  const { nome, email, senha, telefone } = req.body;
  let data = req.body;

  console.log(data);

  let SQL = `INSERT INTO users (nome, email, senha, telefone) VALUES (?,?,?,?)`;
  db.query(SQL, [nome, email, senha, telefone], (err, result) => {
    console.log("erro" + err);
    console.log(result);
    res.send(result);
  });
});

//Rota para deletar usuário
app.delete("/deleteUser/:id", (req, res) => {
  let { id } = req.params;

  let SQL = `DELETE FROM users WHERE iduser=${id}`;

  db.query(SQL, (err, result) => {
    console.log("Delete ERRO" + err);
    console.log("Sucesso" + result);
    res.send(result);
  });
});

//Rota de update de usuários
app.put("/updateUser/:id", (req, res) => {
  let { id } = req.params;
  let { nome, email, senha, telefone } = req.body;
  let updateData = req.body;

  let SQL = `UPDATE users SET ? WHERE iduser = ?`;
  db.query(SQL, [updateData, id], (err, result) => {
    console.log(err);
    console.log(result);
    res.send("update realizado");
  });
});

//Rota de consulta de Jobs
app.get("/jobs", (req, res) => {
  let SQL = "SELECT * FROM jobs";
  db.query(SQL, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.get("/jobs/:id", (req, res) => {
  let { id } = req.params;
  let SQL = `SELECT * FROM jobs WHERE idjob=${id}`;

  db.query(SQL, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });

  console.log(req);
});

//Rota de criação de Jobs
app.post("/createJob", (req, res) => {
  let { nome_job, usuario, status, tipo_recorrencia, valor_recorrencia } =
    req.body;

  let SQL = `INSERT INTO jobs (nome_job, usuario, status, tipo_recorrencia, valor_recorrencia) VALUES (?,?,?,?,?)`;
  db.query(
    SQL,
    [nome_job, usuario, status, tipo_recorrencia, valor_recorrencia],
    (err, result) => {
      console.log(err);
      console.log(result);
      res.send(result);
    }
  );
});

//Rota de update de Jobs
app.put("/updateJob/:id", (req, res) => {
  let { id } = req.params;
  let updateData = req.body;

  let SQL = `UPDATE jobs SET ? WHERE idjob = ?`;
  db.query(SQL, [updateData, id], (err, result) => {
    console.log(err);
    console.log(result);
    res.send("update realizado");
  });
});

app.delete("/deleteJob/:id", (req, res) => {
  let { id } = req.params;

  let SQL = `DELETE FROM jobs WHERE idjob=${id}`;

  db.query(SQL, (err, result) => {
    console.log("Delete ERRO" + err);
    console.log("Sucesso" + result);
    res.send(result);
  });
});

app.listen(5500, () => {
  console.log("Rodando na porta 5500");
});
