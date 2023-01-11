import { RootState } from '../../store';
import User from '../auth/types/User';
import Message from './types/Message';

export function selectCurrentUser(state: RootState): User | undefined {
  return state.auth.currentUser;
}
