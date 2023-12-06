import { configureStore, combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "../reducers/LoginReducer";
import HomepageReducer from "../reducers/HomepageReducer";

const rootReducer = combineReducers({
  login: LoginReducer,
  home: HomepageReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
