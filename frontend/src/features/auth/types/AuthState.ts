import User from "./User";

type AuthState = {
  currentUser: User | undefined;
  error?: string;
  isLoggedIn:boolean;
};

export default AuthState;
