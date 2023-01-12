require("dotenv").config();

const path = require("path");

const { PORT } = process.env;

const express = require("express");

const app = express();

const http = require("http");

const io = require("socket.io");

const expressConfig = require("./config/express");

const { Message, User } = require("./db/models");

const authRouter = require("./routes/AuthRouter");

const uploadRouter = require("./routes/Upload.Routes");

const searchRouter = require("./routes/SearchRouter");

const friendsRouter = require("./routes/FriendsRouter");

const server = http.createServer(app);

function check(req) {
  if (req.socket.isAuthenicated) {
    return { success: true };
  } else return { success: false };
}

const ioSocket = new io.Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowRequest: (req, callback) => {
    try {
      const isOriginValid = check(req);
      callback(null, isOriginValid);
    } catch (err) {
      console.log(err);
    }
  },
});

expressConfig(app, ioSocket);

app.use("/api/auth", authRouter);
app.use("/api/uploadFile", uploadRouter);

app.use("/api/search", searchRouter);

app.use("/api/friends", friendsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.locals.io = ioSocket;

ioSocket.on("connection", async (socket) => {
  try {
    socket.join(`User_${socket.userId}room`);

    app.locals.io = ioSocket;

    socket.on("/messages/send", async (data) => {
      const { text, chatId } = JSON.parse(data);

      if (chatId) {
        const message = await Message.create({
          text,
          username: socket.user.name,
          chatId,
        });
        console.log(`Message: ${text} sended to chat${chatId}`);
        ioSocket.sockets.emit("/messages/recieve", message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

server.listen(PORT, () => {
  console.log("EXPRESS AND SOCKET SERVERS ARE RUNNING");
});
