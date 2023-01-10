import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import User from '../../auth/types/User';

type FriendProps = { friend: User };

function FriendView({ friend }: FriendProps): JSX.Element {
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
        {friend.name[0]}
      </Avatar>{' '}
      <div>{friend.name}</div>
    </Box>
  );
}

export default FriendView;
