import { Button, TextField } from "@mui/material";
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
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <TextField
        sx={{ ml: 1 }}
        id="outlined-basic"
        label="Your name"
        variant="outlined"
        value={name}
        onChange={handleNameChange}
        required
      />
      <TextField
        sx={{ ml: 1 }}
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <TextField
        sx={{ ml: 1 }}
        id="outlined-basic"
        label="Repeat password"
        type="password"
        variant="outlined"
        value={passwordRepeat}
        onChange={handleRepeatPasswordChange}
        required
      />
      <Button sx={{ mt: 1, ml: 1 }} type="submit" variant="contained">
        Registrate
      </Button>
    </form>
  );
}
