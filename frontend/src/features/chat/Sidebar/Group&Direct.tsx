import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type GroupProps = { item: string };

function Group({ item }: GroupProps): JSX.Element {
  return (
    <Box
      sx={{
        width: '100%',

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
      <Box
        sx={{
          display: {
            xs: 'none',
            sm: 'null',
            md: 'flex',
            lg: 'flex',
            xl: 'flex',
          },
        }}
      >
        {item}
      </Box>
    </Box>
  );
}

export default Group;
