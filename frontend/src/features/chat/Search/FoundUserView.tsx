import { Avatar, Box, IconButton, Typography } from '@mui/material';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import React, { memo, useState } from 'react';
import User from '../../auth/types/User';

type FoundUserViewProps = {
  user: User;
};

function FoundUserView({ user }: FoundUserViewProps): JSX.Element {
  const [added, setAdded] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: 'warning.main',
        width: 0.9,
        height: '30',
        p: 1,
        mb: 2,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Avatar>{user.name[0]}</Avatar>
      <Typography
        align="left"
        variant="h1"
        sx={{
          ml: 1,
          mr: 'auto',
          color: 'primary.main',
          fontSize: 18,
          wordBreak: 'break-all',
        }}
      >
        {user.name}
      </Typography>
      <IconButton onClick={() => setAdded(true)} color="secondary">
        {added ? <CheckRoundedIcon /> : <MapsUgcRoundedIcon />}
      </IconButton>
    </Box>
  );
}

export default memo(FoundUserView);
