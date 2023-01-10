require("dotenv").config();

const { PORT } = process.env;

const express = require("express");

const app = express();

const http = require("http");

const io = require("socket.io");


const expressConfig = require("./config/express");

const { Message, User } = require("./db/models");

const authRouter = require("./routes/AuthRouter");

const searchRouter = require("./routes/SearchRouter");

const server = http.createServer(app);

const ioSocket = new io.Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials:true
  },
});

expressConfig(app, ioSocket);

app.use("/api/auth", authRouter);
app.use("/api", searchRouter);




ioSocket.on("connection", async (socket) => {
try{

  console.log(socket.handshake.session.userId)

  const messages = await Message.findAll({
    limit: 10,
    order: [["createdAt", "DESC"]],
  });

  socket.emit("/messages", messages);
  
  socket.userId = socket.handshake.session.userId;

  socket.user = await User.findByPk(socket.userId);

  socket.on("/messages/send", async (data) => {
    
  console.log(data)

  const {text} = JSON.parse(data);

  const message = await Message.create({text,username:socket.user.name});

  ioSocket.sockets.emit("/messages/recieve", message);

  console.log(`Message ${text} from ${socket.user.name} sended`);

  });}
  catch(error) {
    console.log(error);
  }}
);



server.listen(PORT, () => {
  console.log("EXPRESS AND SOCKET SERVERS ARE RUNNING");
});

