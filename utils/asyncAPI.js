// AsyncStorage API calls
import { AsyncStorage } from 'react-native';


const DECK_STORAGE_KEY = 'MobileFlashcard:decks';

/* Retrieve all deck. Returns object */
export const getAllDecks = () => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(JSON.parse)
    .then( (decks) => !decks ? {} : decks );
}

/* Retrieve a single deck with given title. Returns object */
export const getDeck = (title) => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(JSON.parse)
    .then( (decks) => decks[title] )
}

/* Add new deck. Takes title of new deck */
export const addDeck = (title) => {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, 
    JSON.stringify({
      [title] : {
        title,
        questions: []
      }
    })
  );
}

/* Add given question card to deck with given title. */
export const addCard = (title, card) => {

}

/* Clear all decks */
export const clearAllDecks = () => {
  return AsyncStorage.removeItem(DECK_STORAGE_KEY);
}
