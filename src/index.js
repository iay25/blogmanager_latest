import React from 'react';
import ReactDOM from 'react-dom';
import  './utils/css/bootstrap.css'
import './utils/css/styles.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store/store'
ReactDOM.render(<Provider store={store}>
    <App {...this.props}/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
