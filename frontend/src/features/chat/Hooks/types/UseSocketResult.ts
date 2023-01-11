import { Socket } from 'socket.io-client';
import User from '../../../auth/types/User';

type UseSocketResult = {
  user: User | undefined;
  sendMessage: (event: React.FormEvent) => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket;
};

export default UseSocketResult;
