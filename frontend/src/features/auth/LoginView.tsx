import { Button, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useAppDispatch } from "../../store";
import { logInUserThunk } from "./authSlice";

export default function LoginView(): JSX.Element {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

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
    console.log(`honk`);
    dispatch(logInUserThunk({ email, password }));
  };

  return (
    <form onSubmit={handleLogin}>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        sx={{ ml: 1 }}
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button sx={{ mt: 1, ml: 1 }} type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
}
