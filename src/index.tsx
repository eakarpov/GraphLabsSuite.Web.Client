import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import {init} from "./lib/connector";
import {Promise} from 'bluebird';
global.Promise = Promise;

init({
    hostBase: 'http://gl-backend.svtz.ru:5000/'
});

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
