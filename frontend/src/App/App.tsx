import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/system';
import Auth from '../features/auth/Auth';
import { useAppDispatch } from '../store';
import { userCheckThunk } from '../features/auth/authSlice';
import { selectIsLoggedIn, selectLoading } from '../features/auth/selectors';
import Sidebar from '../features/chat/Sidebar/Sidebar';
import Loading from './Loading';

import HomePage from '../features/chat/Home/HomePage';
// import AuthPage from '../RegLogView/Authorization';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userCheckThunk());
  }, [dispatch]);

  const authCheckd = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectLoading);

  return (
    <Box
      className='main'
      sx={{
        hegiht: '100%',
        display: 'flex',
        margin: '7vh 10vw',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {loading ? (
        <Loading />
      ) : authCheckd ? (
        <>
          <Sidebar />
          <HomePage />
        </>
      ) : (
        <Auth />
      )}
    </Box>
  );
}

export default App;
