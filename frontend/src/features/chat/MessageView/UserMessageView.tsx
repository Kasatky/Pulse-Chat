import { Card, Typography } from '@mui/material';
import React, { memo } from 'react';
import Message from '../types/Message';

type MessageViewProps = {
  message: Message;
};

function UserMessageView({ message }: MessageViewProps): JSX.Element {
  return (
    <Card
      sx={{
        width: 'fit-content',
        minWidth: 40,
        minHeight: 30,
        mb: 2,
        mr: 1,
        float: 'right',
        backgroundColor: 'primary.main',
        clear: 'both',
        borderRadius: 5,
        borderBottomRightRadius: 0,
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

export default memo(UserMessageView);
