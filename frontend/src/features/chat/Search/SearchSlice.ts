import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../auth/types/User';
import searchUsers from './api';
import SearchState from './types/SearchState';

const initialState: SearchState = {
  results: [],
};

export const searchUsersThunk = createAsyncThunk(
  '/search/users',
  async (username: string) => {
    const foundUsers = await searchUsers(username);
    return foundUsers;
  }
);

export const addFriendThunk = createAsyncThunk(
  '/search/users',
  async (username: string) => {
    const foundUsers = await searchUsers(username);
    return foundUsers;
  }
);

const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        searchUsersThunk.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.results = action.payload;
        }
      )
      .addCase(searchUsersThunk.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default SearchSlice.reducer;
export const { resetSearch } = SearchSlice.actions;
