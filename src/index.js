import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router.jsx';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'

import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"
import reduxThunk from "redux-thunk"
import reducers from './reducers'

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
