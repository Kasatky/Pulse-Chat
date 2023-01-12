import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Chat from './types/Chat';

type ChatViewProps = { chat: Chat };

function ChatView({ chat }: ChatViewProps): JSX.Element {
  const navigate = useNavigate();

  const { id } = useParams();

  const lastMessage = chat.Messages[chat.Messages.length - 1];

  const handleChatChange = (): void => {
    navigate(`/chats/${chat.id}`);
  };
  const currentColor = chat.id === Number(id) ? 'white' : 'white';
  return (
    <Box
      onClick={handleChatChange}
      sx={{
        backgroundColor: chat.id === Number(id) ? '#585d6e' : '#212329',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      {chat && (
        <>
          <Avatar
            src={`/img/${chat?.image}`}
            alt={chat.name}
            sx={{
              margin: 2,
              cursor: 'pointer',
            }}
          >
            {chat.name[0]}
          </Avatar>
          <div>
            <Typography color={currentColor} onClick={handleChatChange}>
              {chat.name}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              variant="subtitle1"
              color={currentColor}
            >
              {lastMessage.text}
            </Typography>
          </div>
        </>
      )}
    </Box>
  );
}

export default ChatView;
