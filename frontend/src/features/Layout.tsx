import { Link, Outlet } from 'react-router-dom';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import Auth from './auth/Auth';
import { selectIsLoggedIn, selectLoading } from './auth/selectors';
import Sidebar from './chat/Sidebar/Sidebar';
import Loading from '../App/Loading';

function Layout(): JSX.Element {
  const authCheckd = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectLoading);
  return (
    <>
      <Link to="/chats/2">Test link</Link>
      
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
        {loading ? <Loading /> : authCheckd ? <Sidebar /> : <Auth />}
        {authCheckd && <Outlet /> }
        
      </Box>
    </>
  );
}

export default Layout;
