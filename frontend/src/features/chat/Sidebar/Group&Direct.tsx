import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type GroupProps = { item: string };

function Group({ item }: GroupProps): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Avatar
        sx={{
          margin: 2,
        }}
      >
        {item[0]}
      </Avatar>{' '}
      <div>{item}</div>
    </Box>
  );
}

export default Group;
