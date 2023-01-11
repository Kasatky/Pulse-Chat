import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Chat from './types/Chat';

type ChatViewProps = { chat: Chat };

function ChatView({ chat }: ChatViewProps): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {chat && (
        <>
          <Avatar
            sx={{
              margin: 2,
            }}
          >
            {chat.name[0]}
          </Avatar>
          <Typography>{chat.name}</Typography>
        </>
      )}
    </Box>
  );
}

export default ChatView;
