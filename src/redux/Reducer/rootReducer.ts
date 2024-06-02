import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Reducer/Auth/authReducer";
import userReducer from "../Reducer/Users/userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
