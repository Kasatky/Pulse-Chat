import { Box } from '@mui/system';
import React, { memo } from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logo from './chat.png';

// import SearchView from './SearchView';

import allChatsSelector from '../Friends/selectors';
import ChatView from '../Friends/FriendView';
import ModalUserWindow from '../ModalUserWindow/ModalUserWindow';
// import GroupAndDirect from './GroupAndDirect';
import UserSearch from '../Search/UserSearch';
import PhoneChatsModal from './PhoneChatsModal';

function Sidebar(): JSX.Element {
  const chats = useSelector(allChatsSelector);

  const theme = useTheme();
  const phoneView = !useMediaQuery(theme.breakpoints.not('xs'));
  console.log(phoneView);
  return (
    <Box
      sx={{
        backgroundColor: '#212329',
        flexDirection: 'column',
        width: {
          xs: 'none',
          sm: '15vw',
          md: '15vw',
          lg: '15vw',
          xl: '15vw',
        },
        display: 'flex',
        height: { xs: '10vh', sm: 'auto', md: 'auto', lg: 'auto', xl: 'auto' },
        minWidth: 400,
      }}
    >
      <Box
        sx={{
          margin: {
            xs: '2vh',
            sm: 4,
            md: 4,
            lg: 4,
            xl: 4,
          },
          fontSize: 5,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 70,
            margin: 'auto',
          }}
        >
          <img
            src={logo}
            alt="logo"
            width={45}
            style={{ filter: 'brightness(1.75)' }}
          />
        </Box>
        <Typography
          variant="h3"
          align="left"
          sx={{
            width: '300px',
            minWidth: 60,
            color: 'white',
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
          }}
        >
          Pulse
          {phoneView && (
            <Box sx={{ display: 'inline', ml: 5, mb: 4 }}>
              {phoneView && <UserSearch phone={phoneView} />}
              <ModalUserWindow phone={phoneView} />
              <PhoneChatsModal />
            </Box>
          )}
        </Typography>
        {!phoneView && <ModalUserWindow phone={phoneView} />}
      </Box>
      <Box
        sx={{
          width: '100%',
          color: 'white',
          justifyItems: 'stretch',
          flexDirection: 'column',
          display: {
            xs: 'none',
            sm: 'flex',
            md: 'flex',
            lg: 'flex',
            xl: 'flex',
          },
          opacity: 0.8,
          // mb: '40vh',
        }}
      >
        <Box>
          <UserSearch phone={phoneView} />
        </Box>
        {!phoneView && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <Typography variant="h5" align="left" sx={{ ml: '1vw', mb: '3vh' }}>
              Your messages
            </Typography>

            <Box
              sx={{
                width: '100%',
                height: {
                  xs: '80vh',
                  sm: '70vh',
                  md: '70vh',
                  lg: '70vh',
                  xl: '70vh',
                },
                overflowY: 'auto',
                flex: '1 0 auto',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {chats &&
                chats.map((chat) => (
                  <ChatView phone={false} key={chat.id} chat={chat} />
                ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default memo(Sidebar);
