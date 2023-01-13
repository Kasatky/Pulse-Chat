import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import EmojiPicker from 'emoji-picker-react';
import './HomePage.css';
import useSocket from '../Hooks/useSocket';
import allChatsSelector from '../Friends/selectors';
import ChatBox from './ChatBox';

function ChatPage(): JSX.Element {
  const { id: chatId } = useParams();
  const { user, text, setText, sendMessage } = useSocket(Number(chatId));
  const chats = useSelector(allChatsSelector);
  const currentChat = chats.find((chat) => chat.id === Number(chatId));

  const [file, setFile] = useState<File>();
  const filePicker = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: React.FormEvent): void => {
    sendMessage(event, file);
    setFile(undefined);
  };

  useEffect(() => {
    const dd = document.getElementById(`chatBox${currentChat?.id}`);
    if (dd) {
      dd.scrollTo(0, dd.scrollHeight);
    }
  }, [currentChat?.Messages, currentChat?.id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const { length } = event.target.files
      setFile(event.target.files![length - 1]);
    }
  };

  const handlePick = (): void => {
    if (file) {
      setFile(undefined)
    } else filePicker.current!.click();
  };

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
        onSubmit={handleSubmit}
      >
        <ChatBox currentChat={currentChat} user={user} />
        <Box
          sx={{
            padding: "10px 30px",
            // backgroundColor: "gray",
            height: {
              xs: "10vh",
              sm: "auto",
              md: "auto",
              lg: "auto",
              xl: "auto",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              mb: "5px",
              alignItems: "center",
              border: "1px solid black",
              borderRadius: "70px",
              padding: {
                xs: "0px 5px 0px 0px",
                sm: "0px 50px 5px 50px",
                md: "0px 50px 5px 50px",
                lg: "0px 50px 5px 50px",
                xl: "0px 50px 5px 50px",
              },
              backgroundColor: "#1e1f25",
            }}
          >
            <TextField
              sx={{ padding: "5px", margin: 1, input: { color: "white" } }}
              value={text}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setText(event.target.value);
              }}
              name="text"
              autoComplete="off"
              variant="standard"
              className="sendWrap__input"
            />
            <Box>
              <button type="button" onClick={handlePick}>
                <ImageIcon color="primary" />
                {file && (<HighlightOffIcon color="primary" />)}
              </button>
              <input
                className="hidenInput"
                type="file"
                onChange={handleChange}
                ref={filePicker}
                accept="image/*.png,.jpg"
              />
            </Box>
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
            {/* <EmojiPicker /> */}
          </Box>
        </Box>
      </form>
    </Container>
  );
}

export default ChatPage;
