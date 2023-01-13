import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import UploadFile from '../UploadFile/UploadFile';
import selectCurrentUser from '../selectors';
import { logoutThunk } from '../../auth/authSlice';
import { useAppDispatch } from '../../../store';

type ModalUserWindowProps = {
  phone: boolean;
};

function ModalUserWindow({ phone }: ModalUserWindowProps): JSX.Element {
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
    // height: 600,
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

  const handleNicknameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewNick(event.target.value);
  };

  return (
    <>
      {phone && (
        <>
          <SettingsIcon sx={{ mr: 1 }} onClick={handleOpen} />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                Edit profile
                <UploadFile />
              </Typography>

              <Typography
                id="modal-modal-description"
                sx={{
                  alignItems: 'center',
                  mt: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {user?.image ? (
                  <Box
                    sx={{
                      height: 100,
                      width: 100,
                      borderRadius: '50%',
                      backgroundColor: '#4A95D6',
                      backgroundImage: `url(/img/${user?.image})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                ) : (
                  <Avatar sx={{ width: 100, height: 100 }}>
                    <Typography sx={{ fontSize: 50 }}>
                      {user?.name[0]}
                    </Typography>
                  </Avatar>
                )}
                <TextField
                  sx={{ marginTop: 5, marginBottom: 5, width: 1 }}
                  fullWidth
                  disabled
                  label="Nickname"
                  value={newNick}
                  onChange={handleNicknameChange}
                />
                {/* <TextField fullWidth label='Bio' id='fullWidth' /> */}

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    type="submit"
                    sx={{ marginTop: 5, marginBottom: 5, width: '40%' }}
                    variant="contained"
                    onClick={handleClose}
                  >
                    Save
                  </Button>
                  <Button
                    sx={{
                      // width: '100%',
                      // height: '3vh',
                      color: 'black',
                    }}
                    disableElevation
                    onClick={handleLogout}
                    variant="text"
                  >
                    <LogoutIcon />
                  </Button>
                </Box>
              </Typography>
            </Box>
          </Modal>
        </>
      )}
      {!phone && (
        <>
          <Button onClick={handleOpen}>
            <SettingsIcon sx={{ color: 'white' }} />
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                Edit profile
                <UploadFile />
              </Typography>

              <Typography
                id="modal-modal-description"
                sx={{
                  alignItems: 'center',
                  mt: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {user?.image ? (
                  <Box
                    sx={{
                      height: 100,
                      width: 100,
                      borderRadius: '50%',
                      backgroundColor: '#4A95D6',
                      backgroundImage: `url(/img/${user?.image})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                ) : (
                  <Avatar sx={{ width: 100, height: 100 }}>
                    <Typography sx={{ fontSize: 50 }}>
                      {user?.name[0]}
                    </Typography>
                  </Avatar>
                )}
                <TextField
                  sx={{ marginTop: 5, marginBottom: 5, width: 1 }}
                  fullWidth
                  disabled
                  label="Nickname"
                  value={newNick}
                  onChange={handleNicknameChange}
                />
                {/* <TextField fullWidth label='Bio' id='fullWidth' /> */}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'stretch',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  type="submit"
                  sx={{ marginTop: 5, marginBottom: 5, width: '40%' }}
                  variant="contained"
                  onClick={handleClose}
                >
                  Save
                </Button>
                <Button
                  sx={{
                    color: 'black',
                    // width: '100%',
                    // height: '3vh',
                  }}
                  disableElevation
                  onClick={handleLogout}
                  variant="text"
                >
                  <LogoutIcon />
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}

export default ModalUserWindow;
