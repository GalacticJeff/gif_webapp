import { SEARCH_LOADING, SEARCH_DATA, GET_FAVORITES, GET_HISTORY } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    data: {},
    favorites: {},
    existData: false,
    existHistory: false,
    existFavorites: false,
    loading: false
};
  export default function(state = initialState, action) {
    switch (action.type) {
      case SEARCH_DATA:
        return {
          ...state,
          data: action.payload,
          existData: true
        };
      case SEARCH_LOADING:
        return {
          ...state,
          loading: !state.loading
        };
      case GET_FAVORITES:
        return {
          ...state,
          favorites: action.payload,
          existFavorites: true
        }
      case GET_HISTORY:
        return {
          ...state,
          history: action.payload,
          existHistory: true
        }
      default:
        return state;
    }
  }