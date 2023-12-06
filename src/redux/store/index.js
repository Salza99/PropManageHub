import { configureStore, combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "../reducers/LoginReducer";
import HomepageReducer from "../reducers/HomepageReducer";
import CustomerReducer from "../reducers/CustomerReducer";

const rootReducer = combineReducers({
  login: LoginReducer,
  home: HomepageReducer,
  customer: CustomerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
