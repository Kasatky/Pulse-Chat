import { Box } from '@mui/system';
import React from 'react';
import { Typography } from '@mui/material';
import SearchView from './SearchView';
import Group from './Group&Direct';

function Sidebar(): JSX.Element {
  const groups = ['Billionares club', 'Bates'];
  const directs = ['Steve Jobs', 'Bill Gates'];
  return (
    <Box
      sx={{
        width: 400,
        height: 1300,
        backgroundColor: '#43388B',
        color: 'white',
        opacity: 0.8,
      }}
    >
      <SearchView />
      <>
        <Typography align='left' sx={{ ml: '1vw' }}>
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
        <Typography align='left' sx={{ ml: '1vw', mb: '3vh' }}>
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
          {directs.map((el) => (
            <Group item={el} />
          ))}
        </Box>
      </>
    </Box>
  );
}

export default Sidebar;
