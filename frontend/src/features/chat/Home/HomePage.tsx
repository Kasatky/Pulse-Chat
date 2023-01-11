import React, { useMemo } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import CompanionMessageView from '../MessageView/CompanionMessageView';
import './HomePage.css';
import UserMessageView from '../MessageView/UserMessageView';
import useSocket from '../Hooks/useSocket';

function HomePage(): JSX.Element {
  const socket: Socket = useMemo(() => io(window.location.origin, { withCredentials: true }), []);

  const { user, messages, sendMessage, text, setText } = useSocket(socket);

  return (
    <Container
      sx={{
        mt: '1vh',
        position: 'relative',
        width: '70%',
        height: 'auto',
        display: 'flex',
      }}
    >
      <form
        style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}
        onSubmit={sendMessage}
      >
        <Box
          className='messages'
          sx={{
            position: 'relative',
            height: 0,
            flex: '1 0 auto',
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
            user?.name === message.username ? <UserMessageView message={message} /> : <CompanionMessageView message={message} />
          )}
        </Box>

        <div className='mainInput'>
          <div className='sendWrap'>
            <TextField
              sx={{ margin: 2, input: { color: 'white' } }}
              value={text}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setText(event.target.value);
              }}
              name='text'
              variant='standard'
              className='sendWrap__input'
            />
            <Button
              sx={{ borderRadius: '50%', width: '50px', height: '50px', minWidth: '0px' }}
              type='submit'
              variant='contained'
              className='sendWrap__btn'
            >
              <img style={{ height: 30 }} src='https://cdn-icons-png.flaticon.com/512/9068/9068203.png' alt='fly' />
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
}

export default HomePage;
