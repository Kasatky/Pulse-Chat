import Message from '../../types/Message';

type Chat = {
  id: number;
  Messages: Message[];
  name: string;
  image?: string;
};

export default Chat;
