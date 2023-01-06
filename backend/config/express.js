const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");
const path = require("path");
const getUser = require("../middlewares/getUser");
const sharedsession = require("express-socket.io-session");
const sessionMiddleware = session(sessionConfig);

const wrap = expressMiddleware => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

function expressConfig(app, io) {
  app.use(sessionMiddleware);

  // io.use(
  //   sharedsession(sessionMiddleware, {
  //     autoSave: true,
  //   })
  // );

  io.use(wrap(sessionMiddleware))

  app.use(getUser);

  // io.use((socket, next)=> {
  //     sessionMiddleware(socket.request, socket.request.res, next);
  // });


  app.use(express.static(path.join(__dirname, "../../frontend/build")));

  app.use(morgan("dev"));

  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());
}

module.exports = expressConfig;
