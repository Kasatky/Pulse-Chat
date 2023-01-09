import React, { useMemo } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import CompanionMessageView from '../MessageView/CompanionMessageView';
import './HomePage.css';
import UserMessageView from '../MessageView/UserMessageView';
import useSocket from '../Hooks/useSocket';

function HomePage(): JSX.Element {
  const socket: Socket = useMemo(
    () => io(window.location.origin, { withCredentials: true }),
    []
  );

  const { user, messages, sendMessage, text, setText } = useSocket(socket);

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
          {messages.map((message) =>
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

export default HomePage;
