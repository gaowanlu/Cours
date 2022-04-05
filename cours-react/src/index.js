import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import store  from './app/store';
import { Provider } from 'react-redux';
import 'animate.css';
import {
  BrowserRouter
} from 'react-router-dom';
import themeLoad from './utils/themeLoad';

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

themeLoad("store");
