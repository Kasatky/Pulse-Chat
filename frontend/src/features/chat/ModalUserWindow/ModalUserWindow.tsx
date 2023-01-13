import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
// import UploadFile from '../UploadFile/UploadFile';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import selectCurrentUser from '../selectors';
import { logoutThunk } from '../../auth/authSlice';
import { useAppDispatch } from '../../../store';

function ModalUserWindow(): JSX.Element {
  const user = useSelector(selectCurrentUser);

  const dispatch = useAppDispatch();
  const handleLogout = (): void => {
    dispatch(logoutThunk());
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '80vw',
      sm: 500,
      md: 500,
      lg: 500,
      xl: 500,
    },
    bgcolor: '#E0E0E0',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: 600,
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
        <SettingsIcon />

      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          
          <Typography id='modal-modal-title' variant='h6' component='h2' >
            Edit profile
            {/* <UploadFile /> */}
            <AddAPhotoIcon sx={{ml:'10px'}}/>

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
              
              <Box sx={{
                display:'flex',
                flexDirection: 'column',
                alignItems: "center",
                
              }}>
              <Button type='submit' sx={{ marginTop: 5, marginBottom: 5, width: '40%' }} variant='contained'>
                Save
              </Button>
        <Button
        sx={{
          // width: '100%',
          // height: '3vh',
          marginTop: 5,

        }}
        disableElevation
        onClick={handleLogout}
        variant="contained"
      >
        <LogoutIcon />
      </Button>
      </Box>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalUserWindow;
