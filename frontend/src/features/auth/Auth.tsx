import { Container, Grid, Link } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LoginView from './LoginView';
import RegistrationView from './RegistrationView';
import { errorSelector } from './selectors';

function Auth(): JSX.Element {
  const error = useSelector(errorSelector);
  const [viewLogin, setViewLogin] = useState(true);
  return (
    <Container sx={{ p: 0 }} component='main'>
      {error && <h1>{error}</h1>}
      {viewLogin ? <LoginView /> : <RegistrationView />}
      <Grid container justifyContent='center'>
        <Grid item>
          <Link
            onClick={() => {
              setViewLogin((prev) => !prev);
            }}
            variant='body2'
          >
            {viewLogin ? 'Don`t have an account? Sign Up' : 'Already have an account? Sign in'}
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Auth;
