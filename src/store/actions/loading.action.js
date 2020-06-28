import * as actionTypes from '../actionTypes';

export function setLoading(value) {
  return {
    type: actionTypes.SET_LOADING,
    payload: value
  }
}