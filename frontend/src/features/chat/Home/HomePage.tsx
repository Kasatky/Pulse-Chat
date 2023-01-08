import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Container, TextField } from '@mui/material';
import { useAppDispatch } from '../../../store';
import { getAllMessages, recieveMessage } from '../MessageSlice';
import selectAllMessages from '../selectors';
import MessageView from '../MessageView/MessageView';

function HomePage(): JSX.Element {
  const socket = io('http://localhost:4000', { withCredentials: true });

  const messages = useSelector(selectAllMessages);

  const dispatch = useAppDispatch();

  const [text, setText] = useState('');

  const sendMessage = (event: React.FormEvent): void => {
    event.preventDefault();
    socket.emit('/messages/send', JSON.stringify({ text }));
    setText('');
  };

  useEffect(() => {
    socket.on('/messages', (data) => {
      dispatch(getAllMessages(data));
    });

    socket.on('/messages/recieve', (data) => {
      dispatch(recieveMessage(data));
    });
    return () => {
      socket.disconnect();
      socket.emit('/messages/disconnect');
    };
  }, []);

  return (
    <form onSubmit={sendMessage}>
      <Container
        sx={{
          mt: '1vh',
          overflow: 'auto',
        }}
      >
        {messages.map((message) => (
          <MessageView message={message} />
        ))}
        <TextField
          sx={{ margin: 1 }}
          value={text}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setText(event.target.value);
          }}
          name="text"
          variant="standard"
        />
        {/* <Button type="submit" sx={{ marginTop: 2 }} variant="contained">
          Send
        </Button> */}
      </Container>
    </form>
  );
}

export default HomePage;
