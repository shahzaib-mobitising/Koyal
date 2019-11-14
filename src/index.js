import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-globally'
import * as serviceWorker from './serviceWorker';

const initialState = {
  tracks : [],
  track_exist : 0,
  trackAlbumImage : '',
  trackAlbumName : '',
  trackGlobalName : '',
  queueState : []
}

ReactDOM.render(
    <Provider globalState={initialState}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
