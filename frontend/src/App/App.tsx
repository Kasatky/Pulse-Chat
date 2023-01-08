import './App.css';
// import AuthPage from '../RegLogView/Authorization';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// import HomePage from '../features/chat/Home/HomePage';
import { Box } from '@mui/system';
import Auth from '../features/auth/Auth';
import { useAppDispatch } from '../store';
import { userCheckThunk } from '../features/auth/authSlice';
import { selectIsLoggedIn } from '../features/auth/selectors';
import Sidebar from '../features/chat/Sidebar/Sidebar';
import HomePage from '../features/chat/Home/HomePage';
// import HomePage from "../features/chat/Home/HomePage";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userCheckThunk());
  }, [dispatch]);

  const authCheckd = useSelector(selectIsLoggedIn);

  return (
    <Box
      className="main"
      sx={{
        hegiht: '100%',
        display: 'flex',
        margin: '7vh 10vw',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {/* <AuthPage /> */}
      {authCheckd ? (
        <>
          <Sidebar />
          <HomePage />
        </>
      ) : (
        <Auth />
      )}
      {/* <header className="App-header"><HomePage /></header> */}
    </Box>
  );
}

export default App;
