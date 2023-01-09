import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { useAppDispatch } from '../../../store';
import User from '../../auth/types/User';
import { getAllMessages, recieveMessage } from '../MessageSlice';
import selectAllMessages, { selectCurrentUser } from '../selectors';
import Message from '../types/Message';

export default function useSocket(socket: Socket): {
  user: User | undefined;
  messages: Message[];
  sendMessage: (event: React.FormEvent) => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
} {
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
  }, []);

  return { user, messages, sendMessage, text, setText };
}
