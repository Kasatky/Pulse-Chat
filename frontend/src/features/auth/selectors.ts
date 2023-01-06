import { RootState } from "../../store";
import User from "./types/User";

export const errorSelector = (state: RootState): string | undefined =>
  state.auth.error;

export const userSelector = (state: RootState): User | undefined =>
  state.auth.currentUser;

export const selectIsLoggedIn = (state: RootState): boolean =>
  state.auth.isLoggedIn;

export const selectName = (state: RootState): string | undefined =>
  state.auth.currentUser?.name;
