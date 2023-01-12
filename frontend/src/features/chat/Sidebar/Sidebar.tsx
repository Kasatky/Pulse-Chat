import { Box } from '@mui/system';
import React, { memo } from 'react';
import { Typography } from '@mui/material';
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

  // const messages = [
  //   'Hi, girls',
  //   'Nice job',
  //   'Im glad to see you, sit down please',
  //   'i need your ...',
  // ];

  return (
    <Box
      sx={{
        backgroundColor: '#212329',
        width: '15vw',
        minWidth: 400,
        // justifyItems: 'stretch',
      }}
    >
      <Box
        sx={{
          margin: 4,
          fontSize: 5,
          display: 'flex',
        }}
      >
        <Typography
          variant="h3"
          align="left"
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
          opacity: 0.8,
          // mb: '40vh',
        }}
      >
        <Box>
          <UserSearch />
        </Box>
        <>
          {/* <Typography align="left" sx={{ ml: '1vw' }}>
            GROUPS
          </Typography> */}
          {/* <Box
            sx={{
              width: '100%',
              // height: 130,
              display: 'flex',
              flexDirection: 'column',
              mb: 10,
            }}
          >
            {groups.map((el, index) => (
              <GroupAndDirect
                key={el.length}
                item={el}
                message={messages[index]}
              />
            ))}
          </Box> */}
        </>
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
              height: '40vh',
              overflowY: 'auto',
              flex: '1 0 auto',
              "&::-webkit-scrollbar": {
                display: "none",
              },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {chats &&
              chats.map((chat) => <ChatView key={chat.id} chat={chat} />)}
          </Box>
        </Box>
      </Box>
      
      
    </Box>
  );
}

export default memo(Sidebar);
