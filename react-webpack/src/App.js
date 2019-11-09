import React from 'react';
import { hot } from 'react-hot-loader/root';
import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="Appheader">
        <img src={logo} className="Applogo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="Applink"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default hot(App);
