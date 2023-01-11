import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../selectors';
import UploadFile from '../UploadFile/UploadFile';

function ModalUserWindow(): JSX.Element {
  const user = useSelector(selectCurrentUser);


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: 500,
    borderRadius: 10,
    display: 'flex',
    // justifyContent: "flex-start",
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 5,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const [newNick, setNewNick] = useState(user?.name);

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewNick(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    // дописать
  };
  return (
    <div>
      <Button sx={{ color: 'black' }} onClick={handleOpen}>
        <img
          style={{ height: 30 }}
          src='https://cdn-icons.flaticon.com/svg/3917/3917058.svg?token=exp=1673278794~hmac=81b7b5c0c23c1ef6a71ee024c6d33603'
          alt='icon'
        />
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Edit profile
            <UploadFile />
          </Typography>

          <Typography id='modal-modal-description' sx={{ alignItems: 'center', mt: 2, display: 'flex', flexDirection: 'column' }}>
            {user?.image ? (
              <Box
                sx={{
                  height: 100,
                  width: 100,
                  borderRadius: '50%',
                  backgroundColor: '#4A95D6',
                  backgroundImage: `url(/img/${user?.image})`,
                  backgroundSize: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : (
              <Avatar sx={{ width: 100, height: 100 }}><Typography sx={{ fontSize: 50 }}>{user?.name[0]}</Typography></Avatar>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ marginTop: 5, marginBottom: 5 }}
                fullWidth
                label='Nickname'
                id='fullWidth'
                value={newNick}
                onChange={handleNicknameChange}
              />
              <TextField fullWidth label='Bio' id='fullWidth' />
              <Button type='submit' sx={{ marginTop: 5, marginBottom: 5 }} variant='contained'>
                Save
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalUserWindow;
