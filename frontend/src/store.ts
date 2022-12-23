import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import messagesSlice from './features/WS-test/MessageSlice';

const store = configureStore({
  reducer: {
    messages: messagesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
