import * as actionTypes from '../actionTypes';
import { getProfileAPI } from 'services/user/profile';
import { loginAPI } from 'services/auth/login';

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
  return {
    type: actionTypes.LOGOUT
  }
}

export function setAccessToken(access_token) {
  return {
    type: actionTypes.SET_ACCESS_TOKEN,
    payload: access_token
  }
}

export function setRefreshToken(refresh_token) {
  return {
    type: actionTypes.SET_REFRESH_TOKEN,
    payload: refresh_token
  }
}