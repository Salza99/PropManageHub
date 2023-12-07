import { configureStore, combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "../reducers/LoginReducer";
import HomepageReducer from "../reducers/HomepageReducer";
import CustomerReducer from "../reducers/CustomerReducer";
import PropertyReducer from "../reducers/PropertyReducer";
import RequestReducer from "../reducers/RequestReducer";

const rootReducer = combineReducers({
  login: LoginReducer,
  home: HomepageReducer,
  customer: CustomerReducer,
  property: PropertyReducer,
  request: RequestReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
