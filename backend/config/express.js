const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");
const path = require("path");
const getUser = require("../middlewares/getUser");
const sharedsession = require("express-socket.io-session");
const sessionMiddleware = session(sessionConfig);

function expressConfig(app, io) {
  app.use(sessionMiddleware);

  io.use(
    sharedsession(sessionMiddleware, {
      autoSave: true,
    })
  );

  app.use(getUser(io));

  // io.use((socket, next) => {
  //   socket.
  //   next();
  // });

  app.use(express.static(path.join(__dirname, "../../frontend/build")));

  app.use(morgan("dev"));

  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());
}

module.exports = expressConfig;
