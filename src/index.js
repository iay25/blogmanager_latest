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
ReactDOM.render(<Provider store={store}>
<BrowserRouter >   
  
  <div>
      <Route exact path="/" component={App}></Route>
      <Route exact path="/post/:post" component={PostComponent}></Route>
   </div>  
  </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
