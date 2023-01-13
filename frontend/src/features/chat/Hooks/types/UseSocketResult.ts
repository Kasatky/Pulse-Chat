import { Socket } from 'socket.io-client';
import User from '../../../auth/types/User';

type UseSocketResult = {
  user: User | undefined;
  sendMessage: (event: React.FormEvent, file: File|undefined) => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket;
  getSocketId: () => string;
};

export default UseSocketResult;
