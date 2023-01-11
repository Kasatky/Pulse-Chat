import { RootState } from '../../store';
import User from '../auth/types/User';

export default function selectCurrentUser(state: RootState): User | undefined {
  return state.auth.currentUser;
}
