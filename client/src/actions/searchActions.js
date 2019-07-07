import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { 
   GET_ERRORS,
   SEARCH_DATA,
   SEARCH_LOADING, 
   GET_FAVORITES, 
   GET_HISTORY } from "./types";
import {URL} from "./routes"

export const searchGif = query => dispatch => {
    dispatch(setDataLoading());
    axios
      .get(`${URL}v1/gif/search/${query}`)
      .then(res => {
        const { data } = res.data;
        console.log(res);
        dispatch(setData(data));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  export const getFavorites = () => dispatch => {
    dispatch(setDataLoading());
    axios
      .get(`${URL}v1/gif/favorites/get`)
      .then(res => {
        console.log(res.data);
        dispatch(setFavorites(res.data));
      })
      .catch(err =>
        console.log(err)
      );
  }

  export const getHistory = () => dispatch => {
    dispatch(setDataLoading());
    axios
      .get(`${URL}v1/gif/history`)
      .then(res => {
        console.log(res.data);
        dispatch(setHistory(res.data));
      })
      .catch(err =>
        console.log(err)
      );
  }

  export const setHistory = data => {
    return {
      type: GET_HISTORY,
      payload: data
    }
  }

// Set logged in user
export const setData = data => {
    return {
      type: SEARCH_DATA,
      payload: data
    };
  };

  
export const setFavorites = data => {
  return {
    type:GET_FAVORITES,
    payload: data
  }
}
  // User loading
  export const setDataLoading = () => {
    return {
      type: SEARCH_LOADING
    };
  };
