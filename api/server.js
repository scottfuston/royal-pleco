// server.js
const express = require("express");
const cors = require("cors");
const server = express();
const helmet = require("helmet");
const morgan = require("morgan");

// global middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

// logs to '/logs/access.log' file
server.use(morgan('dev'));

// define routers
const { jira_router } = require("../routers");

// use routers
server.use("/jira", jira_router);

// root route
server.get("/", (req, res) => {
  res.status(200).json("**** Welcome, the Server is live! ****");
});

// fall back case
server.use("/", (req, res) => {
  res.status(404).json({ Error: "Did not recognize that url" });
});

module.exports = server;
