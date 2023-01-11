import React from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CompanionMessageView from '../MessageView/CompanionMessageView';
import './HomePage.css';
import UserMessageView from '../MessageView/UserMessageView';
import useSocket from '../Hooks/useSocket';
import allChatsSelector from '../Friends/selectors';

function ChatPage(): JSX.Element {
  const { user, text, setText, sendMessage } = useSocket();
  const chats = useSelector(allChatsSelector);
  const { id: chatId } = useParams();
  console.log('______________________');
  console.log(chats);

  const currentChat = chats.find((chat) => chat.id === Number(chatId));
  console.log('______________________');

  return (
    <form onSubmit={sendMessage}>
      <Container
        sx={{
          mt: '1vh',
          position: 'relative',
          width: '70em',
        }}
      >
        <Box
          className="messages"
          sx={{
            position: 'relative',
            height: '700px',
            width: '100%',
            overflowY: 'auto',
            justifyContent: 'flex-end',
            flexDirection: 'column',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {currentChat &&
            currentChat.Messages.map((message) =>
              user?.name === message.username ? (
                <UserMessageView message={message} />
              ) : (
                <CompanionMessageView message={message} />
              )
            )}
        </Box>

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

export default ChatPage;
