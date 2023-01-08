import {
  Box,
  Button,
  Avatar,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { logInUserThunk } from './authSlice';
// import LoginView from './LoginView';
import { errorSelector } from './selectors';

function Auth(): JSX.Element {
  const error = useSelector(errorSelector);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setEmail(event.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setPassword(event.target.value);
    },
    []
  );

  const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(logInUserThunk({ email, password }));
  };

  return (
    <Container component="main" maxWidth="xs">
      {error && <h1>{error}</h1>}

      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form noValidate onSubmit={handleLogin}>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleEmailChange}
                  value={email}
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  variant="outlined"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Auth;
