import { RootState } from '../../../store';
import User from '../../auth/types/User';

export const foundUsersSelector = (state: RootState): User[] =>
  state.search.results;

export const errorSelector = (state: RootState): string | undefined =>
  state.search.error;
