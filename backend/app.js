require("dotenv").config();

const express = require("express");

const app = express();

const http = require("http");

const io = require("socket.io");

const cors = require("cors");

const expressConfig = require("./config/express");

const { Message } = require("./db/models");

const authRouter = require("./routes/AuthRouter");

const server = http.createServer(app);

const ioSocket = io(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

expressConfig(app, ioSocket);

app.use("/api/auth", authRouter);

ioSocket.on("connection", async (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  // console.log(socket.user);

  const messages = await Message.findAll({
    limit: 8,
    order: [["createdAt", "DESC"]],
  });

  socket.emit("/messages", messages);

  socket.on("/messages/send", async (data) => {
    const messageInfo = JSON.parse(data);

    const session = socket.handshake.session;

    // console.log(session);

    const message = await Message.create(messageInfo);

    ioSocket.sockets.emit("/messages/recieve", message);

    ioSocket.sockets.on("/messages/disconnect", () => {
      console.log("user disconnected");

      socket.disconnect();

      socket._cleanup();
    });

    console.log(`Message ${data} sended`);
  });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log("EXPRESS AND SOCKET SERVERS ARE RUNNING");
});

// server.listen(3001, () => {
//   console.log(`SOCKET SERVER IS RUNNING`);
// });
