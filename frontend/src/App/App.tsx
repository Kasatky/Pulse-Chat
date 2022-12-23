import React from 'react';
import './App.css';
import Test from '../features/WS-test/test';
import HomePage from "../features/chat/Home/HomePage";

function App(): JSX.Element {
  return (
    <div className="App">
      <Test />
      <header className="App-header">
        <HomePage />
      </header>
    </div>
  );
}

export default App;
