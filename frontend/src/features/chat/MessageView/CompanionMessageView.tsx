import { Card, Typography } from '@mui/material';
import React, { memo } from 'react';
import ImageView from '../ImageView/ImageView';
import Message from '../types/Message';

type MessageViewProps = {
  message: Message;
};

function CompanionMessageView({ message }: MessageViewProps): JSX.Element {
  return (
    <Card
      sx={{
        width: 'fit-content',
        minWidth: 40,
        minHeight: 30,
        mb: 2,
        mr: 1,
        float: 'left',
        clear: 'both',
        backgroundColor: 'secondary.main',
        borderRadius: 5,
        borderBottomLeftRadius: 0,
        padding: 1,
      }}
      elevation={2}
    >
      <Typography
        style={{ display: 'inline-block' }}
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
        <Typography
          style={{ display: 'inline-block' }}
          sx={{
            marginLeft: 1,
            color: 'grey',
            fontSize: 10,
          }}>
          {`${message.createdAt.substring(11, 16)}`}</Typography>
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
      {message.imageLink && <ImageView msgImg={message.imageLink} />}
    </Card>
  );
}

export default memo(CompanionMessageView);
