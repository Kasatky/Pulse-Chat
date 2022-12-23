import './App.css';
import AuthPage from '../RegLogView/Authorization';
import Test from '../features/WS-test/test';
import HomePage from "../features/chat/Home/HomePage";

function App(): JSX.Element {
  return (
    <div className="App">
      <AuthPage />
      <Test />
      <header className="App-header">
        <HomePage />
      </header>
    </div>
  );
}

export default App;
