import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "./types/User";

import AuthState from "./types/AuthState";
import Credentials from "./types/Credentials";
import logInUser, { checkUser, logout, registration } from "./api";
import Registration from "./types/Registration";

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

export const registrationThunk = createAsyncThunk(
  "auth/registrationThunk",
  async (regData: Registration) => {
    const regUser = await registration(regData);
    return regUser;
  }
);

export const logoutThunk = createAsyncThunk("auth/logoutThunk", async () => {
  await logout();
});

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
          state.isLoggedIn = true;
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
      })

      .addCase(registrationThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload;
      })

      .addCase(registrationThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.currentUser = undefined;
      })

      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
