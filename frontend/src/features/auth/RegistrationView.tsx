import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useCallback, useState } from "react";
import { useAppDispatch } from "../../store";
import { registrationThunk } from "./authSlice";

export default function LoginView(): JSX.Element {
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [passwordRepeat, setRepeatPassword] = useState("");

  const dispatch = useAppDispatch();

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setEmail(event.target.value);
    },
    []
  );

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setName(event.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setPassword(event.target.value);
    },
    []
  );

  const handleRepeatPasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setRepeatPassword(event.target.value);
    },
    []
  );

  const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (password !== passwordRepeat) {
      alert("Passwords don`t match");
    } else {
      dispatch(registrationThunk({ email, name, password, passwordRepeat }));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={name}
                  onChange={handleNameChange}
                  autoComplete="given-name"
                  required
                  fullWidth
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={handleEmailChange}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={passwordRepeat}
                  onChange={handleRepeatPasswordChange}
                  required
                  fullWidth
                  label="Password repeat"
                  type="password"
                  autoComplete="repeate-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </form>
  );
}
