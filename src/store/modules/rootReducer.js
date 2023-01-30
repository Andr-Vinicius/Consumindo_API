import { combineReducers } from "redux";

import auth from './auth/reducer'

export default combineReducers({ // Combina vários reducers, no nosso caso só possui um
  auth,
});