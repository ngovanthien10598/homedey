import * as actionTypes from '../actionTypes';
import { getProfileAPI } from 'services/user/profile';
import { loginAPI } from 'services/auth/login';

export function loginSuccess(token) {
  return {
    type: actionTypes.LOGIN,
    payload: token
  }
}

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
      const token = loginRes.data.data;
      dispatch(loginSuccess(token));
      dispatch(getProfileAction(token));
    } catch (error) {
      console.log(error);
    }
  }
}

export function getProfileAction(token) {
  return async dispatch => {
    try {
      const getProfileRes = await getProfileAPI(token);
      dispatch(getProfileSuccess(getProfileRes.data.data));
    } catch (error) {
      console.log(error);
    }
  }
}

export function logoutAction() {
  return {
    type: actionTypes.LOGOUT
  }
}

export function setToken(token) {
  return {
    type: actionTypes.SET_TOKEN,
    payload: token
  }
}