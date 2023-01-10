import { Box } from '@mui/system';
import React from 'react';
import { Button, Typography } from '@mui/material';
import { logoutThunk } from '../../auth/authSlice';

import SearchView from './SearchView';
import Group from './Group&Direct';
import { useAppDispatch } from '../../../store';

function Sidebar(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleLogout = (): void => {
    dispatch(logoutThunk());
  };
  const groups = ['Billionares club', 'Bates'];
  const directs = ['Steve Jobs', 'Bill Gates'];
  return (
    <Box sx={{ backgroundColor: '#43388B', width: '30%' }}>
      <Box
        sx={{
          width: '100%',
          color: 'white',
          opacity: 0.8,
          mb: '40vh',
        }}
      >
        <SearchView />
        <>
          <Typography align='left' sx={{ ml: '1vw' }}>
            GROUPS
          </Typography>
          <Box
            sx={{
              width: '100%',
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
          <Typography align='left' sx={{ ml: '1vw', mb: '3vh' }}>
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
            {directs.map((el) => (
              <Group item={el} />
            ))}
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
        variant='contained'
      >
        Logout...
      </Button>
    </Box>
  );
}

export default Sidebar;
