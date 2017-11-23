import * as AsyncAPI from '../utils/asyncAPI';
import * as Types from './types';

function requestDecks() {
  return {
    type: Types.REQUEST_DECKS
  };
}
function receiveAllDecks(decks) {
  return {
    type: Types.GET_ALL_DECKS,
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


function receiveDeck(deck) {
  return {
    type: Types.RECEIVE_DECK,
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