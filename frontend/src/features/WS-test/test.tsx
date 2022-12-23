import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { Box, Button, TextField } from "@mui/material";
import { useAppDispatch } from "../../store";
import { getAllMessages, recieveMessage } from "./MessageSlice";
import selectAllMessages from "./selectors";

export const socket = io();

function Test(): JSX.Element {
  const messages = useSelector(selectAllMessages);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  const sendMessage = (event: React.FormEvent): void => {
    event.preventDefault();
    socket.emit("/messages/send", JSON.stringify({ username, text }));
  };

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
  }, [dispatch]);

  return (
    <div className="App">
      <form onSubmit={sendMessage}>
        <Box sx={{ margin: "1vw", padding: 1 }}>
          <TextField
            sx={{ margin: 1 }}
            value={username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(event.target.value);
            }}
            name="username"
            label="Username"
            variant="outlined"
          />

          <TextField
            sx={{ margin: 1 }}
            value={text}
            placeholder="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setText(event.target.value);
            }}
            name="text"
            label="Your message"
            variant="outlined"
          />
          <Button type="submit" sx={{ marginTop: 2 }} variant="contained">
            Send
          </Button>
        </Box>
      </form>
      {messages.map((message, index) => (
        <Box
          sx={{
            maxWidth: "40vw",
            margin: "auto",
            borderRadius: 5,
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <div key={`${index}`}>
            <h1>From:{message.username}</h1>
            <p>{message.text}</p>
          </div>
        </Box>
      ))}
    </div>
  );
}

export default Test;
