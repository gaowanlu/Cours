import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {
  BrowserRouter
} from 'react-router-dom';
import localStore from './data/localStore';

console.log("成绩", localStore.score());
console.log("普通课表", localStore.stuTable());
console.log("实验课表", localStore.labTable());
console.log("个人信息", localStore.selfInfo());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);