import { RootState } from '../../../store';
import User from '../../auth/types/User';

const allFriendsSelector = (state: RootState): User[] => state.friends.friends;

export default allFriendsSelector;
