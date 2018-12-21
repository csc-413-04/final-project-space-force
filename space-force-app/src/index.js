import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import {importPost} from './redux/actions';

const websocket = new WebSocket('ws://localhost:1234/ws');
var image = new Image();
var context;

websocket.onopen = () => {
    console.log('ws has connected')
}

websocket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    switch (data.type) {
        case 'MESSAGE_BROADCAST':
        
            store.dispatch(importPost(data.url));
            break;
        default:

    }
    console.log(e);
}

ReactDOM.render(
    <Provider store={store}>
    <Router>
      <App />
    </Router>
    </Provider>,
    document.getElementById("root")
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
