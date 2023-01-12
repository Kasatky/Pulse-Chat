import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Message from '../types/Message';
import addFriend, { loadFriends as loadChats } from './api';
import Chat from './types/Chat';
import FriendsState from './types/FriendsState';

function arrayMove(arr: any[], old_index: number, new_index: number): any[] {
  if (new_index >= arr.length) {
    let k = new_index - arr.length + 1;
    // eslint-disable-next-line no-cond-assign
    while ((k -= 1)) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

const initialState: FriendsState = {
  chats: [],
};

export const addChatThunk = createAsyncThunk(
  '/friends/addChat',
  async (id: number) => {
    const addedChat = await addFriend(id);
    if (Array.isArray(addedChat)) {
      return undefined;
    }
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
        const oldIndexOfChat = state.chats.indexOf(chatOfRecievedMessage);

        arrayMove(state.chats, oldIndexOfChat, 0);

        chatOfRecievedMessage.Messages.push(action.payload);
      }
    },
    recieveInvite: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
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
        if (action.payload) state.chats.push(action.payload);
      })
      .addCase(addChatThunk.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default FriendsSlice.reducer;
export const { recieveMessage, recieveInvite } = FriendsSlice.actions;
