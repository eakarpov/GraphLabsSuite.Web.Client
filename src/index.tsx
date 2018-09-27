import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {init} from "./lib/connector";
import {Promise} from 'bluebird';
global.Promise = Promise;

init({
    hostBase: 'http://13.68.132.23:5001/'
});

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
