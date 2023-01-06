import "./App.css";
// import AuthPage from '../RegLogView/Authorization';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Test from "../features/WS-test/test";
import Auth from "../features/auth/Auth";
import { useAppDispatch } from "../store";
import { logoutThunk, userCheckThunk } from "../features/auth/authSlice";
import { selectIsLoggedIn, selectName } from "../features/auth/selectors";
// import HomePage from "../features/chat/Home/HomePage";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userCheckThunk());
  }, [dispatch]);

  const handleLogout = (): void => {
    dispatch(logoutThunk());
  };

  const name = useSelector(selectName);

  const authCheckd = useSelector(selectIsLoggedIn);

  return (
    <div className="App">
      {/* <AuthPage /> */}
      {authCheckd ? (
        <>
          <h1>Hello {name}!</h1>{" "}
          <Button
            sx={{ mt: 1, ml: 1 }}
            onClick={handleLogout}
            variant="contained"
          >
            Logout...
          </Button>
          <Test />
        </>
      ) : (
        <Auth />
      )}
      <header className="App-header">{/* <HomePage /> */}</header>
    </div>
  );
}

export default App;
