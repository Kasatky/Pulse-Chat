import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Message from '../types/Message';
import addFriend, { loadFriends as loadChats } from './api';
import Chat from './types/Chat';
import FriendsState from './types/FriendsState';

const initialState: FriendsState = {
  chats: [],
};

export const addChatThunk = createAsyncThunk(
  '/friends/addChat',
  async (id: number) => {
    const addedChat = await addFriend(id);
    return addedChat;
  }
);

export const loadChatsThunk = createAsyncThunk(
  '/friends/getFriends',
  async () => {
    const chats = await loadChats();
    return chats;
  }
);

const FriendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    recieveMessage: (state, action: PayloadAction<Message>) => {
      const chatOfRecievedMessage = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      if (chatOfRecievedMessage) {
        chatOfRecievedMessage.Messages.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loadChatsThunk.fulfilled,
        (state, action: PayloadAction<Chat[]>) => {
          state.chats = action.payload;
        }
      )
      .addCase(loadChatsThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addChatThunk.fulfilled, (state, action) => {
        state.chats.push(action.payload.chat);
      })
      .addCase(addChatThunk.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default FriendsSlice.reducer;
export const { recieveMessage } = FriendsSlice.actions;
