require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const expressConfig = require("./config/express");
const { Message } = require("./db/models");
expressConfig(app);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log(`User Connected: ${socket.id}`);

  const messages = await Message.findAll({
    limit: 8,
    order: [["createdAt", "DESC"]],
  });

  socket.emit("/messages", messages);

  socket.on("/messages/send", async (data) => {
    const messageInfo = JSON.parse(data);

    console.log(messageInfo);

    const message = await Message.create(messageInfo);

    io.sockets.emit("/messages/recieve", message);

    io.sockets.on("/messages/disconnect", () => {
      console.log("user disconnected");

      socket.disconnect();

      socket._cleanup();
    });

    console.log(`Message ${data} sended`);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const { PORT } = process.env;

// app.listen(3001, () => {
//   console.log("EXPRESS SERVER IS RUNNING");
// });

server.listen(3001, () => {
  console.log(`SOCKET SERVER IS RUNNING`);
});
