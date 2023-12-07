import { configureStore, combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "../reducers/LoginReducer";
import HomepageReducer from "../reducers/HomepageReducer";
import CustomerReducer from "../reducers/CustomerReducer";
import PropertyReducer from "../reducers/PropertyReducer";

const rootReducer = combineReducers({
  login: LoginReducer,
  home: HomepageReducer,
  customer: CustomerReducer,
  property: PropertyReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
