import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Message from './types/Message';

import MessagesState from './types/MessagesState';

const initialState: MessagesState = {
  messages: [],
};

const MessagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getAllMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },

    recieveMessage: (state, action: PayloadAction<Message>) => {
      if (state.messages.length >= 8) {
        // state.messages.shift();
        state.messages.push(action.payload);
      }
    },
  },
});

export default MessagesSlice.reducer;

export const { getAllMessages, recieveMessage } = MessagesSlice.actions;
