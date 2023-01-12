import { Box } from '@mui/system';
import React, { memo } from 'react';
import {  Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import logo from './chat.png'

// import SearchView from './SearchView';

import allChatsSelector from '../Friends/selectors';
import ChatView from '../Friends/FriendView';
import ModalUserWindow from '../ModalUserWindow/ModalUserWindow';
// import GroupAndDirect from './GroupAndDirect';
import UserSearch from '../Search/UserSearch';

function Sidebar(): JSX.Element {
  const chats = useSelector(allChatsSelector);

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
          <Box sx={{
            width: 70,
            margin: 'auto'
        }}>

          <img  src={logo} alt="logo" width={45} />
          </Box>
        <Typography
          variant='h3'
          align='left'
          sx={{
            // fontSize: '2rem',
            width: '300px',
            minWidth: 100,
            color: 'white',
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
          }}
        >
          Pulse
        </Typography>
        <Box sx={{marginTop: 2}}>

        <ModalUserWindow />
        </Box>
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
          <UserSearch />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <Typography variant='h5' align="left" sx={{ ml: '1vw', mb: '3vh' }}>
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
              "&::-webkit-scrollbar": {
                display: "none",
              },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {chats && chats.map((chat) => <ChatView key={chat.id} chat={chat} />)}
          </Box>
        </Box>
       
        
      </Box>
    </Box>
  );
}

export default memo(Sidebar);
