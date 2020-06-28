import * as actionTypes from '../actionTypes';

const initialState = {
  loading: false
}

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return { ...state }
  }
}