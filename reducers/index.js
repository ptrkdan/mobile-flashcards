import { combineReducers } from 'redux';
import { REQUEST_DECKS, GET_ALL_DECKS, RECEIVE_DECK,
         SET_LAST_QUIZ_DATE, SET_DAILY_NOTIFICATION_ON, SET_NOTIFICATION_TIME } from '../actions';

const initDeckState = {
  isFetching: false,
  items: {}
}

function decks(state = initDeckState, action) {
  switch(action.type) {
    case REQUEST_DECKS:
      return {
        ...state,
        isFetching: true
      };
    case GET_ALL_DECKS:
      return {
        isFetching: false,
        items: action.decks
      };
    case RECEIVE_DECK:
      return {
        isFetching: false,
        items: {
          ...state.items,
          [action.deck.title]: action.deck
        }
      };
    default:
      return state;
  }
}

const initDailyQuizNotificationState = {
  lastQuizDate: null,
  isDailyNotificationOn: true,
  notificationHour: 21,
  notificationMinute: 0
}

function dailyQuizNotification(state = initDailyQuizNotificationState, action) {
  switch(action.type) {
    case SET_LAST_QUIZ_DATE:
      console.log('lastQuizDate: ', action.quizDate);
      return { 
        ...state,
        lastQuizDate: action.quizDate 
      };
    case SET_DAILY_NOTIFICATION_ON:
      console.log('isDailyNotificationOn: ', action.isDailyNotificationOn);
      return {
        ...state,
        isDailyNotificationOn: action.isDailyNotificationOn
      };
    case SET_NOTIFICATION_TIME:
      console.log('notification time: ', action);
      return {
        ...state,
        notificationHour: action.notificationHour,
        notificationMinute: action.notificationMinute
      };
    default:
      return state;
  }
}

export default combineReducers({ decks, dailyQuizNotification });