const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");
const path = require("path");
const getUser = require("../middlewares/getUser");
const sharedsession = require("express-socket.io-session");
const fileUpload = require('express-fileupload')
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

  // io.use(wrap(sessionMiddleware))

  app.use(getUser);

  // io.use((socket, next)=> {
  //     sessionMiddleware(socket.request, socket.request.res, next);
  // });
  app.use(fileUpload({
    createParentPath:true,
    limits: { fileSize: 50 * 1024 * 1024 },
  }))
    
    

  app.use(express.static(path.join(__dirname, "../../frontend/build")));

  app.use(morgan("dev"));


}

module.exports = expressConfig;
