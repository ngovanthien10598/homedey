import * as actionTypes from '../actionTypes';
import { getProfileAPI } from 'services/user/profile';
import { loginAPI } from 'services/auth/login';
import Cookies from 'js-cookie';

function getProfileSuccess(user) {
  return {
    type: actionTypes.GET_PROFILE,
    payload: user
  }
}


export function loginAction(body) {
  return async dispatch => {
    try {
      const loginRes = await loginAPI(body);
      const responseData = loginRes.data;
      const access_token = responseData.data.access_token;
      const refresh_token = responseData.data.refresh_token;
      Cookies.set('access', access_token, { expires: 10 * 60 });
      Cookies.set('refresh', refresh_token, { expires: 24 * 3660 });
      dispatch(setAccessToken(access_token));
      dispatch(setRefreshToken(refresh_token));
      dispatch(getProfileAction(access_token));
    } catch (error) {
      console.log(error);
    }
  }
}

export function getProfileAction(access_token) {
  return async dispatch => {
    try {
      const getProfileRes = await getProfileAPI(access_token);
      dispatch(getProfileSuccess(getProfileRes.data.data));
    } catch (error) {
      console.log({ error: error });
    }
  }
}

export function logoutAction() {
  localStorage.removeItem('user');
  Cookies.remove('access');
  Cookies.remove('refresh');
  return {
    type: actionTypes.LOGOUT
  }
}

export function setAccessToken(access_token) {
  Cookies.set('access', access_token, { expires: 10 * 60 });
  return {
    type: actionTypes.SET_ACCESS_TOKEN,
    payload: access_token
  }
}

export function setRefreshToken(refresh_token) {
  Cookies.set('refresh', refresh_token, { expires: 24 * 3660 });
  return {
    type: actionTypes.SET_REFRESH_TOKEN,
    payload: refresh_token
  }
}