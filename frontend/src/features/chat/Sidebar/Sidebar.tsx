import { Box } from '@mui/system';
import React, { memo } from 'react';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

// import SearchView from './SearchView';
import allChatsSelector from '../Friends/selectors';
import ChatView from '../Friends/FriendView';
import ModalUserWindow from '../ModalUserWindow/ModalUserWindow';
// import GroupAndDirect from './GroupAndDirect';
import UserSearch from '../Search/UserSearch';

function Sidebar(): JSX.Element {

  const chats = useSelector(allChatsSelector);

  // const groups = ['Billionares club', 'Bates'];

  // const messages = ['Hi, girls', 'Nice job', 'Im glad to see you, sit down please', 'i need your ...'];

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
        height: { xs: '10vh', sm: 'none', md: 'none', lg: 'none', xl: 'none' },
        minWidth: 400,
        // justifyItems: 'stretch',
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

        {/* <>
          <Typography align='left' sx={{ ml: '1vw' }}>
            GROUPS
          </Typography>
          <Box
            sx={{
              width: '100%',

              // height: 130,
              display: 'flex',
              flexDirection: 'column',

              mb: 10,
            }}
          >
            {groups.map((el, index) => (
              <GroupAndDirect key={el.length} item={el} message={messages[index]} />
            ))}
          </Box>
        </> */}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <Typography align='left' sx={{ ml: '1vw', mb: '3vh' }}>
            DIRECT
          </Typography>

          <Box
            sx={{
              width: '100%',
              height: {
                xs: '80vh',
                sm: '40vh',
                md: '40vh',
                lg: '40vh',
                xl: '40vh',
              },
              overflowY: 'auto',
              flex: '1 0 auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {chats && chats.map((chat) => <ChatView key={chat.id} chat={chat} />)}
          </Box>
        </Box>
        <ModalUserWindow />
        <Button
          sx={{
            width: '100%',
            height: '3vh',
          }}
          disableElevation
          variant='contained'
        >
          Logout...
        </Button>
      </Box>
    </Box>
  );
}

export default memo(Sidebar);
