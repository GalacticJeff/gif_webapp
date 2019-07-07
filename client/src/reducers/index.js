import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import searchReducers from "./searchReducers"


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  search: searchReducers
});