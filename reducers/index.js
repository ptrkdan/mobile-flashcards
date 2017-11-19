import { REQUEST_DECKS, GET_ALL_DECKS, RECEIVE_DECK } from '../actions';

const initState = {
  isFetching: false,
  items: {}
}

function decks(state = initState, action) {
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

export default decks;