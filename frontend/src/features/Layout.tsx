import { Outlet } from 'react-router-dom';
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
      {}
      {loading ? (
        <Loading />
      ) : authCheckd ? (
        <Box
          className='main'
          sx={{
            maxWidth: 'xs',
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
              md: 'row',
              lg: 'row',
            },
            borderRadius: 8,
            overflow: 'hidden',
            margin: {
              xs: '0px 5px',
              sm: '2vh 2vw',
              md: '2vh 8vw',
              lg: '2vh 8vw',
            },
          }}
        >
          <Sidebar />
          <Outlet />
        </Box>
      ) : (
        <Box
          sx={{
            m: '60px 25px',
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: 'secondary.main',
          }}
        >
          <Box
            className='main'
            sx={{
              backgroundColor: '#E0E0E0',
              borderRadius: 8,
              // minWidth: 'md',
              // mt: 'auto',
              // hegiht: "100%",
              // display: 'flex',
              // my: 'auto',
              // overflow: 'hidden',
            }}
          >
            <Auth />
          </Box>
        </Box>
      )}
    </>
  );
}

export default Layout;
