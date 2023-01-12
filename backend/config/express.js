const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");
const path = require("path");
const getUser = require("../middlewares/getUser");
const sharedsession = require("express-socket.io-session");
const fileUpload = require('express-fileupload')
const sessionMiddleware = session(sessionConfig);
const { User } = require("../db/models");

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

  io.use((socket, next) => {
  if (socket.handshake.session.userId) {
  


  socket.userId = socket.handshake.session.userId;
  
  promiseUser = new Promise((resolve, reject) => {  
    resolve(User.findByPk(socket.userId))
  });

  promiseUser.then((user) =>{
    if(user){
      socket.user = user;
      socket.isAuthenicated = true;

      next()
    }
    else next(new Error("User not found"))
  }
  )
  
  
  } else {
    next(new Error("unauthorized"))
  }
});
  
  app.use(fileUpload({
    createParentPath:true,
    limits: { fileSize: 50 * 1024 * 1024 },
  }))
    
    

  // app.use(express.static(path.join(__dirname, "../../frontend/build")));
  app.use(express.static(path.resolve("public")));

  app.use(morgan("dev"));


}

module.exports = expressConfig;
