import "./App.css";
// import AuthPage from '../RegLogView/Authorization';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Test from "../features/WS-test/test";
import Auth from "../features/auth/Auth";
import { useAppDispatch } from "../store";
import { userCheckThunk } from "../features/auth/authSlice";
import { selectAuthChecked } from "../features/auth/selectors";
// import HomePage from "../features/chat/Home/HomePage";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userCheckThunk());
  }, [dispatch]);

  const authCheckd = useSelector(selectAuthChecked);

  return (
    <div className="App">
      {authCheckd && <h1>qwer</h1>}
      {/* <AuthPage /> */}
      {authCheckd ? <h1>Hello!</h1> : <Auth />}
      <Test />
      <header className="App-header">{/* <HomePage /> */}</header>
    </div>
  );
}

export default App;
