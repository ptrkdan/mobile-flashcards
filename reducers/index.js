import { combineReducers } from 'redux';
import decks from './decks';
import notifications from './notifications';

export default combineReducers({ decks, notifications });