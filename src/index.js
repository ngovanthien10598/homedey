import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from 'store/store';
import { Provider } from 'react-redux';
import axios from 'axios';
import { notification } from 'antd';
import { setAccessToken } from 'store/actions/user.action';
import apiPrefix from 'services/apiPrefix';
import Cookies from 'js-cookie';

import 'antd/dist/antd.css';
import 'styles/style.scss';

// Setup axios interceptors
function setupAxios(store) {
  axios.interceptors.request.use(config => {

    return config;
  }, error => {
    return Promise.reject(error);
  });
  axios.interceptors.response.use(response => {
    return response
  }, (error) => {

    let message = "";
    let description = "";

    if (error.response) {
      if (error.response.status === 401) {
        const refreshToken = Cookies.get('refresh');
        if (refreshToken) {
          return axios.post(`${apiPrefix}/auth/refresh-token/`, {
            refresh_token: refreshToken
          }).then(response => {
            const accessToken = response.data.data.access_token;
            store.dispatch(setAccessToken(accessToken));
            const config = error.config;
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            return new Promise((resolve, reject) => {
              axios.request(config).then(res => {
                resolve(res);
              }).catch(err => {
                reject(err);
              })
            })
          }).catch(err => {
            Promise.reject(err);
          })
        }
      }

      if (error.response.data) {
        message = error.response.data.code;
        description = error.response.data.message;
      }

    } else if (error.request) {
      message = error.status;
      description = error.message;
    } else {
      message = error.status;
      description = error.message;
    }
    notification.error({
      message: `Lỗi (${message})`,
      description: description
    });

    return Promise.reject(error);
  });
}

setupAxios(store);

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
