import { Box } from '@mui/system';
import React, { memo } from 'react';
import User from '../../auth/types/User';
import Chat from '../Friends/types/Chat';
import CompanionMessageView from '../MessageView/CompanionMessageView';
import UserMessageView from '../MessageView/UserMessageView';
import Message from '../types/Message';

type ChatBoxPropos = {
  currentChat: Chat | undefined;
  user: User | undefined;
};
function ChatBox({ currentChat, user }: ChatBoxPropos): JSX.Element {
  return (
    <Box
      id={`chatBox${currentChat?.id}`}
      className="messages"
      sx={{
        position: 'relative',
        padding: {
          xs: '10px',
          sm: '40px',
          md: '40px',
          lg: '40px',
          xl: '40px',
        },
        height: {
          xs: '80vh',
          sm: 'none',
          md: 'none',
          lg: 'none',
          xl: 'none',
        },

        // display:'flex',
        flex: '1 0 auto',
        width: '100%',
        overflowY: 'auto',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {currentChat &&
        currentChat.Messages.map((message: Message) =>
          user?.name === message.username ? (
            <UserMessageView key={message.id} message={message} />
          ) : (
            <CompanionMessageView key={message.id} message={message} />
          )
        )}
    </Box>
  );
}

export default memo(ChatBox);
