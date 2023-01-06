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
        minWidth: '5vw',
        maxWidth: '100%',
        minHeight: '5vh',
        maxHeight: 'fit-content',

        mb: 2,
        borderRadius: 5,
        ...styleForUserMessage,
        // backgroundColor: '#323232',
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
          fontSize: '1.5vh',
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
          fontSize: '1.5vh',
          wordBreak: 'break-all',
        }}
      >
        {message.text}
      </Typography>
    </Card>
  );
}

export default MessageView;
