import * as actionTypes from '../actionTypes';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null
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
        accessToken: null
      }
    case actionTypes.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload
      }
    case actionTypes.SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload
      }
    default:
      return { ...state }
  }
}