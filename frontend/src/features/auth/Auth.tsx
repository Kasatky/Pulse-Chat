import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoginView from "./LoginView";
import RegistrationView from "./RegistrationView";
import { errorSelector } from "./selectors";

function Auth(): JSX.Element {
  const error = useSelector(errorSelector);
  const [showForm, setShowForm] = useState(true);

  const handleFormChange = (): void => {
    setShowForm((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
      {error && <h1>{error}</h1>}
      {showForm ? <LoginView /> : <RegistrationView />}
      <Button
        sx={{ mt: 1, ml: 1 }}
        onClick={handleFormChange}
        variant="contained"
      >
        {showForm ? "Registration..." : "Login..."}
      </Button>
    </Box>
  );
}

export default Auth;
