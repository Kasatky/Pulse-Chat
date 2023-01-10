import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../auth/types/User';
import addFriend, { loadFriends } from './api';
import FriendsState from './types/FriendsState';

const initialState: FriendsState = {
  friends: [],
};

export const addFriendThunk = createAsyncThunk(
  '/friends/addFriend',
  async (id: number) => {
    const addedFriend = await addFriend(id);
    return addedFriend;
  }
);

export const loadFriendsThunk = createAsyncThunk(
  '/friends/getFriends',
  async (id: number) => {
    const friends = await loadFriends(id);
    return friends;
  }
);

const FriendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loadFriendsThunk.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.friends = action.payload;
        }
      )
      .addCase(loadFriendsThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(
        addFriendThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.friends.push(action.payload);
        }
      )
      .addCase(addFriendThunk.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default FriendsSlice.reducer;
