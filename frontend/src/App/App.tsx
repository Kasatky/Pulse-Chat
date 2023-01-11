import './App.css';
import { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Layout from '../features/Layout';

import { useAppDispatch } from '../store';
import { userCheckThunk } from '../features/auth/authSlice';
import ChatPage from '../features/chat/Home/HomePage';
import { selectCurrentUser } from '../features/chat/selectors';
import { loadChatsThunk } from '../features/chat/Friends/FriendsSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userCheckThunk());
  }, [dispatch]);

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user) {
      dispatch(loadChatsThunk());
      // eslint-disable-next-line react-hooks/rules-of-hooks
    }
  }, [dispatch, user]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<div>Hello world</div>} />
        <Route path="/chats/:id" element={<ChatPage />} />
      </Route>
    </Routes>
  );
}

export default App;
