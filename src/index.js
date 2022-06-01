import React from 'react';
import ReactDOM from 'react-dom';
import SettingsProvider from './context/settings';
import {BrowserRouter} from 'react-router-dom';
import App from './App.js';
import LogginProvider from './context/Login-context';
class Main extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <LogginProvider>

      <SettingsProvider>

        <App />

      </SettingsProvider>
      </LogginProvider>
      </BrowserRouter>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);