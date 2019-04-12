//React//
import React from 'react';
import ReactDOM from 'react-dom';
//---//

//Socket.io//
import {getSocket} from './socket';
//---//

//Redux setup for dev tools//
import {createStore, applyMiddleware} from 'redux';
import reduxPromise from 'redux-promise';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducer';
import {Provider} from 'react-redux';
const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
//---//

//Import components//
import Welcome from './welcome';
import App from './app';
//---//

//Define paths//
let elem;

if (location.pathname == '/welcome') {
    elem = <Welcome />;
} else {
    getSocket(store);
    elem = (
        <Provider store = {store}>
            <App />
        </Provider>
    );
}
//---//

//Render page//
ReactDOM.render(
    elem,
    document.querySelector('main')
);
//---//
