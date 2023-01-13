import { Avatar, Box, IconButton, Typography } from '@mui/material';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import React, { memo, useState } from 'react';
import User from '../../auth/types/User';
import { useAppDispatch } from '../../../store';
import { addChatThunk } from '../Friends/FriendsSlice';

type FoundUserViewProps = {
  user: User;
  phone: boolean;
};

function FoundUserView({ user, phone }: FoundUserViewProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [added, setAdded] = useState(false);

  const handleIconClick = (): void => {
    setAdded(true);
    dispatch(addChatThunk(user.id));
  };

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        width: 0.9,
        height: '30',
        p: 1,
        mb: 2,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {user?.image ? (
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundImage: `url(/img/${user?.image})`,
            backgroundSize: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <Avatar
          sx={{
            width: 80,
            height: 80,
          }}
        >
          {user.name[0]}
        </Avatar>
      )}
      {phone ? (
        <Typography
          align="left"
          variant="h4"
          sx={{
            color: 'white',
            ml: 1,
            mr: 'auto',
            fontSize: 16,
            wordBreak: 'break-all',
          }}
        >
          {user.name}
        </Typography>
      ) : (
        <Typography
          align="left"
          variant="h4"
          sx={{
            color: 'white',
            ml: 1,
            mr: 'auto',
            fontSize: 20,
            wordBreak: 'break-all',
          }}
        >
          {user.name}
        </Typography>
      )}

      <IconButton onClick={handleIconClick} color="secondary">
        {added ? <CheckRoundedIcon /> : <MapsUgcRoundedIcon />}
      </IconButton>
    </Box>
  );
}

export default memo(FoundUserView);
