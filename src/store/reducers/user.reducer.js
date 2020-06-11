import * as actionTypes from '../actionTypes';

const initialState = {
  user: null,
  token: null
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        token: action.payload
      }
    case actionTypes.GET_PROFILE:
      return {
        ...state,
        user: action.payload
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        token: null
      }
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        user: null,
        token: action.payload
      }
    default:
      return { ...state }
  }
}