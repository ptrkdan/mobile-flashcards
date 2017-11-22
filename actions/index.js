import * as AsyncAPI from '../utils/asyncAPI';

export const REQUEST_DECKS = 'REQUEST_DECKS';
function requestDecks() {
  return {
    type: REQUEST_DECKS
  };
}


export const GET_ALL_DECKS = 'GET_ALL_DECKS';
function receiveAllDecks(decks) {
  return {
    type: GET_ALL_DECKS,
    decks
  }
}

export function retrieveAllDecks() {

  return function(dispatch) {
    dispatch(requestDecks());

    return AsyncAPI.getAllDecks()
      .then( (value) => dispatch(receiveAllDecks(value)) );
  };
}

export const RECEIVE_DECK = 'RECEIVE_DECK';
function receiveDeck(deck) {
  return {
    type: RECEIVE_DECK,
    deck
  };
}

export function addDeck(title) {

  return function(dispatch) {
    dispatch(requestDecks());

    return AsyncAPI.addDeck(title)
      .then( () => AsyncAPI.getDeck(title).then( (value) => value) )
      .then( (deck) => dispatch(receiveDeck(deck)));
  };
}

export function addCard(title, card) {

  return function(dispatch) {

    return AsyncAPI.addCard(title, card)
      .then( () => AsyncAPI.getDeck(title).then( (value) => value ) )
      .then( (deck) => dispatch(receiveDeck(deck)));
  };
}

/* Notifications */

export const SET_LAST_QUIZ_DATE = 'SET_LAST_QUIZ_DATE';
export function setLastQuizDate(quizDate) {
  return {
    type: SET_LAST_QUIZ_DATE,
    quizDate
  };
}

export const SET_DAILY_NOTIFICATION_ON = 'SET_DAILY_NOTIFICATION_ON';
export function setDailyNotificationOn(isDailyNotificationOn) {
  return {
    type: SET_DAILY_NOTIFICATION_ON,
    isDailyNotificationOn
  };
}

export const SET_NOTIFICATION_TIME = 'SET_NOTIFICATION_TIME';
export function setNotificationTime(notificationHour, notificationMinute) {
  return {
    type: SET_NOTIFICATION_TIME,
    notificationHour,
    notificationMinute
  }
}

export function retrieveNotificationSettings() {

  return function(dispatch) {

    return AsyncAPI.getNotificationSettings()
      .then((data) => {
        if (!data) {
          dispatch(setDailyNotificationOn(true));
          dispatch(setNotificationTime(21, 0));
        } else {
          dispatch(setLastQuizDate(data.lastQuizDate));
          dispatch(setDailyNotificationOn(data.isDailyNotificationOn));
          dispatch(setNotificationTime(data.notificationHour, data.notificationMinute));
        }
      });
  }
}

export function setNotificiationSettings(notificationSettings) {

  return function(dispatch) {
    dispatch(setLastQuizDate(notificationSettings.lastQuizDate));
    dispatch(setDailyNotificationOn(notificationSettings.isDailyNotificationOn));
    dispatch(setNotificationTime(notificationSettings.notificationHour, notificationSettings.notificationMinute));
    return AsyncAPI.setNotificationSettings(notificationSettings);
  }
}
