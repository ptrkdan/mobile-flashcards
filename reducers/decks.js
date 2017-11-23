import * as Types from '../actions/types';

const initDeckState = {
  isFetching: false,
  items: {}
}

export default function decks(state = initDeckState, action) {
  switch(action.type) {
    case Types.REQUEST_DECKS:
      return {
        ...state,
        isFetching: true
      };
    case Types.GET_ALL_DECKS:
      return {
        isFetching: false,
        items: action.decks
      };
    case Types.RECEIVE_DECK:
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