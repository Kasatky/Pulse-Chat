import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useAppDispatch } from '../../../store';
import { recieveMessage } from '../Friends/FriendsSlice';
import selectCurrentUser from '../selectors';
import Message from '../types/Message';
import UseSocketResult from './types/UseSocketResult';

const socket = io(window.location.origin, { withCredentials: true });

export default function useSocket(chatId: number | undefined): UseSocketResult {
  const user = useSelector(selectCurrentUser);

  const dispatch = useAppDispatch();

  const [text, setText] = useState('');

  const sendMessage = (event: React.FormEvent): void => {
    event.preventDefault();
    socket.emit('/messages/send', JSON.stringify({ text, chatId }));
    setText('');
  };


  useEffect(() => {
    socket.on('/messages/recieve', (data: Message) => {
      dispatch(recieveMessage(data));
    });
    return () => {
      socket.disconnect();
      socket.emit('/messages/disconnect');
    };
  }, [dispatch]);

  return { user, sendMessage, text, setText, socket };
}
