import React from 'react';
import ReactDOM from 'react-dom';
// The default locale is en-US, but we can change it to other language
import moment from 'moment';
import 'moment/locale/br';
import App from "./person/App";

import * as serviceWorker from './serviceWorker';

moment.locale('br');


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
