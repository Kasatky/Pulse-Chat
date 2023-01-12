import React, { useEffect } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CompanionMessageView from "../MessageView/CompanionMessageView";
import "./HomePage.css";
import UserMessageView from "../MessageView/UserMessageView";
import useSocket from "../Hooks/useSocket";
import allChatsSelector from "../Friends/selectors";

function ChatPage(): JSX.Element {
  const { id: chatId } = useParams();

  const { user, text, setText, sendMessage } = useSocket(Number(chatId));

  const chats = useSelector(allChatsSelector);

  const currentChat = chats.find((chat) => chat.id === Number(chatId));

  useEffect(() => {
    const dd = document.getElementById(`chatBox${currentChat?.id}`);
    if (dd) {
      dd.scrollTo(0, dd.scrollHeight);
    }
  }, [currentChat?.Messages, currentChat?.id]);

  return (
    <Container
      style={{ paddingLeft: 0, paddingRight: 0, maxWidth: "none", flex: "1" }}
      sx={{
        position: "relative",
        width: "auto",
        height: "auto",
        display: "flex",
        justifyItems: "stretch",
        pl: 0,
        pr: 0,
        ml: 0,
        mr: 0,
      }}
    >
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
        onSubmit={sendMessage}
      >
        <Box
          id={`chatBox${currentChat?.id}`}
          className="messages"
          sx={{
            position: "relative",
            padding: "40px",
            height: 0,
            flex: "1 0 auto",
            width: "100%",
            overflowY: "auto",
            justifyContent: "flex-end",
            flexDirection: "column",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {currentChat &&
            currentChat.Messages.map((message) =>
              user?.name === message.username ? (
                <UserMessageView key={message.id} message={message} />
              ) : (
                <CompanionMessageView key={message.id} message={message} />
              )
            )}
        </Box>

        <Box
          sx={{
            padding: "10px 30px",
            backgroundColor: "gray",
            minHeight: "",
          }}
        >
          <Box
            sx={{
              display: "flex",
              mb: "5px",
              alignItems: "center",
              border: "1px solid black",
              borderRadius: "70px",
              padding: "5px 50px 5px 50px",
              backgroundColor: "#1e1f25",
            }}
          >
            <TextField
              sx={{ padding: 1, margin: 1, input: { color: "white" } }}
              value={text}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setText(event.target.value);
              }}
              name="text"
              autoComplete="off"
              variant="standard"
              className="sendWrap__input"
            />
            <Button
              sx={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                minWidth: "0px",
              }}
              type="submit"
              variant="contained"
              className="sendWrap__btn"
            >
              <img
                style={{ height: 30 }}
                src="https://cdn-icons-png.flaticon.com/512/9068/9068203.png"
                alt="fly"
              />
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
}

export default ChatPage;
