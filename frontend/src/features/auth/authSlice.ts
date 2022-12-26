import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "./types/User";

import AuthState from "./types/AuthState";
import Credentials from "./types/Credentials";
import logInUser, { checkUser } from "./api";

const initialState: AuthState = {
  currentUser: undefined,
  isLoggedIn: false,
};

export const logInUserThunk = createAsyncThunk(
  "auth/logInUserThunk",
  async (credentials: Credentials) => {
    const user = await logInUser(credentials);
    return user;
  }
);

export const userCheckThunk = createAsyncThunk(
  "auth/userCheckThunk",
  async () => {
    const userStatus = await checkUser();
    return userStatus;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        logInUserThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.currentUser = action.payload;
        }
      )

      .addCase(logInUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userCheckThunk.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        if (action.payload.isLoggedIn) {
          state.currentUser = action.payload.user;
        }
      });
  },
});

export default authSlice.reducer;
