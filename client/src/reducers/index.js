import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import twitchReducer from './twitchReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  twitch: twitchReducer
});
