import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './features/auth/authSlice';
import FriendsSlice from './features/chat/Friends/FriendsSlice';
import messagesSlice from './features/chat/MessageSlice';
import SearchSlice from './features/chat/Search/SearchSlice';

const store = configureStore({
  reducer: {
    messages: messagesSlice,
    auth: authSlice,
    search: SearchSlice,
    friends: FriendsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
