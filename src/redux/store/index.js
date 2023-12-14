import { configureStore, combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "../reducers/LoginReducer";
import HomepageReducer from "../reducers/HomepageReducer";
import CustomerReducer from "../reducers/CustomerReducer";
import PropertyReducer from "../reducers/PropertyReducer";
import RequestReducer from "../reducers/RequestReducer";
import AdminReducer from "../reducers/AdminReducer";
import AddressReducer from "../reducers/AddressReducer";

const rootReducer = combineReducers({
  login: LoginReducer,
  home: HomepageReducer,
  customer: CustomerReducer,
  property: PropertyReducer,
  request: RequestReducer,
  admin: AdminReducer,
  address: AddressReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
