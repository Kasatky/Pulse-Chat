import { RootState } from '../../store';
import Message from './types/Message';

function selectAllMessages(state: RootState): Message[] {
  return state.messages.messages;
}

export default selectAllMessages;
