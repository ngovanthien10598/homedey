import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import 'styles/style.scss';
import * as serviceWorker from './serviceWorker';
import store from 'store/store';
import { Provider } from 'react-redux';
import axios from 'axios';
import { notification } from 'antd';


// Setup axios interceptors
axios.interceptors.response.use(response => {
  return response
}, (error) => {

  if (error.response) {
    let message = "";
    let description = "";
    if (error.response) {
      console.log({ response: error.response });
      message = error.response.data.code;
      description = error.response.data.message;

    } else if (error.request) {
      message = error.status;
      description = error.request.message;
    } else {
      message = error.status;
      description = error.message;
    }
    notification.error({
      message: `Lỗi (${message})`,
      description: description
    })
  }
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
