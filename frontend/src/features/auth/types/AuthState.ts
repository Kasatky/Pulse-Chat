import User from './User';

type AuthState = {
  currentUser: User | undefined;
  error?: string;
  isLoggedIn: boolean;
  loading: boolean;
};

export default AuthState;
