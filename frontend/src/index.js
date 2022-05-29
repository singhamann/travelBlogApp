import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'

const store = createStore(reducer)

// Adding a request interceptor
axios.interceptors.request.use(config => {
  const token= localStorage.getItem('token')
  config.headers = {
    token: token ? token: null
  }
  return config
},function(error){
  return Promise.reject(error)
}); 

ReactDOM.render(
  <React.StrictMode>
    <Provider store= {store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
