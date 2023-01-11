import { Box } from '@mui/system';
import React, { memo } from 'react';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { logoutThunk } from '../../auth/authSlice';

// import SearchView from './SearchView';
import { useAppDispatch } from '../../../store';
import allChatsSelector from '../Friends/selectors';
import ChatView from '../Friends/FriendView';
import ModalUserWindow from '../ModalUserWindow/ModalUserWindow';
import GroupAndDirect from './GroupAndDirect';
import UserSearch from '../Search/UserSearch';

function Sidebar(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    dispatch(logoutThunk());
  };

  const chats = useSelector(allChatsSelector);

  const groups = ['Billionares club', 'Bates'];

  const messages = [
    'Hi, girls',
    'Nice job',
    'Im glad to see you, sit down please',
    'i need your ...',
  ];

  return (
    <Box sx={{ backgroundColor: '#212329', height: '100' }}>
      <Box
        sx={{
          margin: 4,
          fontSize: 5,
        }}
      >
        <Typography
          variant="h4"
          align="left"
          sx={{ ml: '1vw', mb: '3vh', color: 'white' }}
        >
          Messages
        </Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
          color: 'white',

          opacity: 0.8,
          mb: '40vh',
        }}
      >
        <Box>
          <UserSearch />
        </Box>

        <>
          <Typography align="left" sx={{ ml: '1vw' }}>
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
              <GroupAndDirect item={el} message={messages[index]} />
            ))}
          </Box>
        </>

        <>
          <Typography align="left" sx={{ ml: '1vw', mb: '3vh' }}>
            DIRECT
          </Typography>

          <Box
            sx={{
              width: '100%',
              height: 30,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {chats && chats.map((chat) => <ChatView chat={chat} />)}
          </Box>
        </>
      </Box>
      <ModalUserWindow />
      <Button
        sx={{
          width: '100%',
          height: '3vh',
        }}
        disableElevation
        onClick={handleLogout}
        variant="contained"
      >
        Logout...
      </Button>
    </Box>
  );
}

export default memo(Sidebar);
