import User from '../../../auth/types/User';

type SearchState = {
  results: User[];
  error?: string;
};

export default SearchState;
