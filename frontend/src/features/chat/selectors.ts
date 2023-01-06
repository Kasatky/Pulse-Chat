import { RootState } from '../../store';
import User from '../auth/types/User';
import Message from './types/Message';

function selectAllMessages(state: RootState): Message[] {
  return state.messages.messages;
}

export function selectCurrentUser(state: RootState): User | undefined {
  return state.auth.currentUser;
}

export default selectAllMessages;
