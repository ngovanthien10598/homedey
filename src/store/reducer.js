import { combineReducers } from 'redux';
import userReducer from './reducers/user.reducer';
import loadingReducer from './reducers/loading.reducer';

const rootReducer = combineReducers({
  userState: userReducer,
  loadingState: loadingReducer
})

export default rootReducer;