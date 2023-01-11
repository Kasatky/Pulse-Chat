import { Socket } from 'socket.io-client';
import User from '../../../auth/types/User';
import Message from '../../types/Message';

type UseSocketResult = {
  user: User | undefined;
  messages: Message[];
  sendMessage: (event: React.FormEvent) => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket;
};

export default UseSocketResult;
