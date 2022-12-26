import { Box, Button, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { logInUserThunk } from "./authSlice";
import { errorSelector, userSelector } from "./selectors";

function Auth(): JSX.Element {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const error = useSelector(errorSelector);
  const currentUser = useSelector(userSelector);

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
    <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
      {currentUser ? (
        <h1>Hello {`${currentUser.name}`}!</h1>
      ) : (
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
          {error && <h1>{error}</h1>}
        </form>
      )}
    </Box>
  );
}

export default Auth;
