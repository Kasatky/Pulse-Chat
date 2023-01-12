import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type GroupProps = { item: string};

function GroupAndDirect({ item }: GroupProps): JSX.Element {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {' '}
      <Avatar
        sx={{
          margin: 2,
          cursor: 'pointer',

        }}
      >
        {item[0]}
      </Avatar>{' '}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'null',
              md: 'flex',
              lg: 'flex',
              xl: 'flex',
            },
            marginBottom: 1,
            fontWeight: 600,
          cursor: 'pointer',
          }}
        >
          {item}
        </Box>
        {/* {message.length > 30 ? <div>{message.slice(0, 30)} ...</div> : <div>{message}</div>} */}
      </Box>
    </Box>
  );
}

export default GroupAndDirect;
