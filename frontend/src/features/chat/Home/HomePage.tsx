import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { Button, Container, TextField } from "@mui/material";
import { useAppDispatch } from "../../../store";
import { getAllMessages, recieveMessage } from "../MessageSlice";
import selectAllMessages, { selectCurrentUser } from "../selectors";
import CompanionMessageView from "../MessageView/CompanionMessageView";
import "./HomePage.css";
import UserMessageView from "../MessageView/UserMessageView";

function HomePage(): JSX.Element {
  const socket = io("http://localhost:4000", { withCredentials: true });
  const user = useSelector(selectCurrentUser);
  const messages = useSelector(selectAllMessages);

  const dispatch = useAppDispatch();

  const [text, setText] = useState("");

  const sendMessage = (event: React.FormEvent): void => {
    event.preventDefault();
    socket.emit("/messages/send", JSON.stringify({ text }));
  };

  useEffect(() => {
    const dd = document.querySelector(".rightSide");
    if (dd) {
      dd.scrollTo(0, dd.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    socket.on("/messages", (data) => {
      dispatch(getAllMessages(data));
    });

    socket.on("/messages/recieve", (data) => {
      dispatch(recieveMessage(data));
    });
    return () => {
      socket.disconnect();
      socket.emit("/messages/disconnect");
    };
  }, []);

  return (
    <form onSubmit={sendMessage}>
      <Container
        sx={{
          mt: "1vh",
          position: "relative",
          width: "70em",
        }}
      >
        <div className="rightSide">
          {" "}
          {messages.map((message) =>
            user?.name === message.username ? (
              <CompanionMessageView message={message} />
            ) : (
              <UserMessageView message={message} />
            )
          )}{" "}
        </div>

        <div className="sendWrap">
          <TextField
            sx={{ margin: 1 }}
            value={text}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setText(event.target.value);
            }}
            name="text"
            variant="standard"
            className="sendWrap__input"
          />
          <Button type="submit" variant="contained" className="sendWrap__btn">
            Send
          </Button>
        </div>
      </Container>
    </form>
  );
}

export default HomePage;
