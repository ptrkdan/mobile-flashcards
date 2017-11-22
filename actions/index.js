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