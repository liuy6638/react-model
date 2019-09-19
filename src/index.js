import * as serviceWorker from './serviceWorker';

import dva from 'dva';

import './assets/css/index.css'

import fn from './routers'
import { admin } from './models'

const createBrowserHistory = require("history").createBrowserHistory;
const app = new dva({history: createBrowserHistory()});
app.router(fn);
app.model(admin);
app.start("#root");

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
