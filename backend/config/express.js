const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");
const path = require("path");
const getUser = require("../middlewares/getUser");
const sharedsession = require("express-socket.io-session");
const sessionMiddleware = session(sessionConfig);

function expressConfig(app, io) {
  app.use(express.urlencoded({ extended: true }));
  
  app.use(sessionMiddleware);
  
  app.use(getUser);
  
  app.use(express.json());
  
  io.use(
    sharedsession(sessionMiddleware, {
      autoSave: true,
    })
    );
    
    

  app.use(express.static(path.join(__dirname, "../../frontend/build")));

  app.use(morgan("dev"));


}

module.exports = expressConfig;
