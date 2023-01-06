import { Card, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../selectors';
import Message from '../types/Message';

type MessageViewProps = {
  message: Message;
};

function MessageView({ message }: MessageViewProps): JSX.Element {
  const user = useSelector(selectCurrentUser);
  const styleForUserMessage =
    user?.name === message.username
      ? {
          borderBottomRightRadius: 0,
          alignSelf: 'end',
          backgroundColor: 'primary.main',
        }
      : {
          borderBottomLeftRadius: 0,
          justifySelf: 'start',
          backgroundColor: 'secondary.main',
        };

  return (
    <Card
      sx={{
        width: 'fit-content',
        minWidth: 40,
        minHeight: 30,
        mb: 2,
        borderRadius: 5,
        ...styleForUserMessage,
        padding: 1,
      }}
      elevation={2}
    >
      <Typography
        align="left"
        gutterBottom
        variant="subtitle2"
        sx={{
          color: 'white',
          fontSize: 14,
          wordBreak: 'break-all',
        }}
      >
        {message.username}
      </Typography>

      <Typography
        align="left"
        gutterBottom
        variant="subtitle2"
        sx={{
          color: 'white',
          fontSize: 14,
          wordBreak: 'break-all',
        }}
      >
        {message.text}
      </Typography>
    </Card>
  );
}

export default MessageView;
