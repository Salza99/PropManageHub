import { configureStore, combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "../reducers/LoginReducer";

const rootReducer = combineReducers({
  login: LoginReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
