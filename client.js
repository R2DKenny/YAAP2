import ReactDOM from 'react-dom';
import React from 'react';
import { setupRealtime } from './client/Realtime';
import { createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import Yaap2AppContainer from './universal/containers/Yaap2AppContainer';
import Yaap2App from './universal/reducers';
import * as actions from './universal/actions/Yaap2Actions';

import './style/main.css';

let initialState = window.__INITIAL_STATE__;

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
});

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

const store = createStoreWithMiddleware(Yaap2App, initialState);

ReactDOM.render(
    <Provider store={store}>
        <Yaap2AppContainer />
    </Provider>,
    document.getElementById('app')
);

setupRealtime(store, actions);
