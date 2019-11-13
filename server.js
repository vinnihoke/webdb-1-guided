const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const PostRouter = require("./posts/post-router.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api/posts", PostRouter);

server.get("/", (req, res) => {
  res.send("<h3>DB Helpers with knex</h3>");
});

module.exports = server;
