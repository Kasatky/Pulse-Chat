import { Box } from '@mui/system';
import React, { memo } from 'react';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { logoutThunk } from '../../auth/authSlice';

import SearchView from './SearchView';
import Group from './Group&Direct';
import { useAppDispatch } from '../../../store';
import allChatsSelector from '../Friends/selectors';
import ChatView from '../Friends/FriendView';

function Sidebar(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    dispatch(logoutThunk());
  };

  const groups = ['Billionares club', 'Bates'];

  const chats = useSelector(allChatsSelector);

  return (
    <Box sx={{ backgroundColor: '#43388B', height: '100' }}>
      <SearchView />
      <Box
        sx={{
          width: 400,
          color: 'white',
          opacity: 0.8,
          mb: '40vh',
        }}
      >
        <>
          <Typography align="left" sx={{ ml: '1vw' }}>
            GROUPS
          </Typography>
          <Box
            sx={{
              width: 400,
              height: 130,
              display: 'flex',
              flexDirection: 'column',
              mb: 10,
            }}
          >
            {groups.map((el) => (
              <Group item={el} />
            ))}
          </Box>
        </>

        <>
          <Typography align="left" sx={{ ml: '1vw', mb: '3vh' }}>
            DIRECT
          </Typography>

          <Box
            sx={{
              width: 300,
              height: 30,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {chats && chats.map((chat) => <ChatView chat={chat} />)}
          </Box>
        </>
      </Box>
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
