import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Chat from './types/Chat';

type ChatViewProps = { chat: Chat; phone: boolean };

function ChatView({ chat, phone }: ChatViewProps): JSX.Element {
  const navigate = useNavigate();

  const { id } = useParams();

  const lastMessage = chat.Messages[chat.Messages.length - 1];

  useEffect(() => {}, [chat.Messages]);

  const handleChatChange = (): void => {
    navigate(`/chats/${chat.id}`);
  };
  const currentColor = chat.id === Number(id) ? 'white' : 'white';
  return (
    <>
      {phone && (
        <Box
          onClick={handleChatChange}
          sx={{
            backgroundColor: chat.id === Number(id) ? '#585d6e' : '#212329',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: 10,
            mb: 1,
          }}
        >
          {chat && (
            <>
              <Avatar
                src={`/img/${chat?.image}`}
                alt={chat.name}
                sx={{
                  width: 60,
                  height: 60,
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
                  {lastMessage?.text}
                </Typography>
              </div>
            </>
          )}
        </Box>
      )}
      {!phone && (
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
                  width: 60,
                  height: 60,
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
                  {lastMessage?.text}
                </Typography>
              </div>
            </>
          )}
        </Box>
      )}
    </>
  );
}

export default memo(ChatView);
