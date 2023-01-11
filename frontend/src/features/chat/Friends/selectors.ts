import { RootState } from '../../../store';
import Chat from './types/Chat';

const allChatsSelector = (state: RootState): Chat[] => state.friends.chats;

export default allChatsSelector;
