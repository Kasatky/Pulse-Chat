import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
} from '@mui/material';
import ThreePIcon from '@mui/icons-material/ThreeP';
import React from 'react';
import { useSelector } from 'react-redux';
import ChatView from '../Friends/FriendView';
import allChatsSelector from '../Friends/selectors';

export default function PhoneChatsModal(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const chats = useSelector(allChatsSelector);

  const handleOpen = (): void => setOpen(true);

  const handleClose = (): void => {
    setOpen(false);
    // dispatch(resetSearch());
  };

  return (
    <>
      <ThreePIcon onClick={handleOpen} />
      <Dialog
        PaperProps={{
          style: { borderRadius: 20, width: 600 },
        }}
        open={open}
        fullWidth
        maxWidth="xl"
        onClose={handleClose}
      >
        <DialogContent
          sx={{
            height: '70vh',
            display: 'flex',
            borderRadius: '30',
            alignContent: 'center',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <DialogContentText sx={{ width: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              <Typography
                variant="h5"
                align="left"
                sx={{ ml: '1vw', mb: '3vh' }}
              />

              <Box
                sx={{
                  width: '100%',
                  height: {
                    xs: '80vh',
                    sm: '70vh',
                    md: '70vh',
                    lg: '70vh',
                    xl: '70vh',
                  },
                  overflowY: 'auto',
                  flex: '1 0 auto',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onClick={handleClose}
              >
                {chats &&
                  chats.map((chat) => (
                    <ChatView phone key={chat.id} chat={chat} />
                  ))}
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
