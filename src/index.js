import React from 'react';
import ReactDOM from 'react-dom';
import  './utils/css/bootstrap.css'
import './utils/css/styles.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store/store'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import PostComponent from './components/containers/PostComponent';
import Layout from './components/presentational/LayoutComponent';
ReactDOM.render(<Provider store={store}>
<BrowserRouter >   
  <div>
      <Route exact path="/" component={App}></Route>
      <Route exact path="/posts" component={Layout}></Route>
      <Route exact path="/posts/:post" component={PostComponent}></Route>
   </div>  
  </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
