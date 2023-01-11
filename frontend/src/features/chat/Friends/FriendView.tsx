import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useSocket from '../Hooks/useSocket';
import CompanionMessageView from '../MessageView/CompanionMessageView';
import UserMessageView from '../MessageView/UserMessageView';
import Chat from './types/Chat';

type ChatViewProps = { chat: Chat };

function ChatView({ chat }: ChatViewProps): JSX.Element {
  const { user } = useSocket();

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
          <div>
            {chat.Messages.map((m) =>
              user?.name === m.username ? (
                <UserMessageView message={m} />
              ) : (
                <CompanionMessageView message={m} />
              )
            )}
          </div>
        </>
      )}
    </Box>
  );
}

export default ChatView;
