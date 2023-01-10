import User from '../../../auth/types/User';

type FriendsState = {
  friends: User[];
  error?: string;
};

export default FriendsState;
