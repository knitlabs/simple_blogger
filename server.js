const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const Post = require("./models/post");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Post.find((err, posts) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.render("home", { posts: posts });
    }
  });
});

module.exports = app;
