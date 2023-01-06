require("dotenv").config();

const { PORT, SESSIONS_SECRET  } = process.env;

const express = require("express");

const cookie = require('cookie');

const sessionConfig = require('./config/sessionConfig')

const cookieParser = require('cookie-parser')

const app = express();

const http = require("http");

const io = require("socket.io");


const expressConfig = require("./config/express");

const { Message, User } = require("./db/models");

const authRouter = require("./routes/AuthRouter");

const server = http.createServer(app);

const ioSocket = io(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials:true
  },
});

expressConfig(app, ioSocket);

app.use("/api/auth", authRouter);


ioSocket.on("connection", async (socket) => {


  const messages = await Message.findAll({
    limit: 8,
    order: [["createdAt", "DESC"]],
  });

  socket.emit("/messages", messages);


  const idCookie = cookie.parse(socket.handshake.headers.cookie)
  
  const sessionKey = cookieParser.signedCookie(idCookie.user_sid, SESSIONS_SECRET);

  const id = await new Promise((resolve, reject)=>{
    
    sessionConfig.store.get(sessionKey, (err, session) => {
      if (err) reject(err);
      const { userId} = session;
      resolve(userId)
    })

  })
  
  socket.userId = id;
  socket.user = await User.findByPk(socket.userId);

  socket.on("/messages/send", async (data) => {

    const {text} = JSON.parse(data);

    const message = await Message.create({text,username:socket.user.name});

    ioSocket.sockets.emit("/messages/recieve", message);

    ioSocket.sockets.on("/messages/disconnect", () => {
      socket.disconnect();

      socket._cleanup();
    });

    console.log(`Message ${text} sended`);
  });}
);



server.listen(PORT, () => {
  console.log("EXPRESS AND SOCKET SERVERS ARE RUNNING");
});

