import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useAppDispatch } from '../../../store';
import { getAllMessages, recieveMessage } from '../MessageSlice';
import selectAllMessages, { selectCurrentUser } from '../selectors';
import Message from '../types/Message';
import UseSocketResult from './types/UseSocketResult';

const socket = io(window.location.origin, { withCredentials: true });

export default function useSocket(): UseSocketResult {
  const user = useSelector(selectCurrentUser);

  const messages = useSelector(selectAllMessages);

  const dispatch = useAppDispatch();

  const [text, setText] = useState('');

  const sendMessage = (event: React.FormEvent): void => {
    event.preventDefault();
    socket.emit('/messages/send', JSON.stringify({ text }));
    setText('');
  };

  useEffect(() => {
    const dd = document.querySelector('.messages');
    if (dd) {
      dd.scrollTo(0, dd.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    socket.on('/messages', (data: Message[]) => {
      dispatch(getAllMessages(data));
    });

    socket.on('/messages/recieve', (data: Message) => {
      dispatch(recieveMessage(data));
    });
    return () => {
      socket.disconnect();
      socket.emit('/messages/disconnect');
    };
  }, [dispatch]);

  return { user, messages, sendMessage, text, setText, socket };
}
