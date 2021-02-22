const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", { a: "Hello, World!" });
});

module.exports = app;
