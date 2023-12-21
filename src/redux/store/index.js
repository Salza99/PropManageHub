import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import LoginReducer from "../reducers/LoginReducer";
import HomepageReducer from "../reducers/HomepageReducer";
import CustomerReducer from "../reducers/CustomerReducer";
import PropertyReducer from "../reducers/PropertyReducer";
import RequestReducer from "../reducers/RequestReducer";
import AdminReducer from "../reducers/AdminReducer";
import AddressReducer from "../reducers/AddressReducer";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  login: LoginReducer,
  home: HomepageReducer,
  customer: CustomerReducer,
  property: PropertyReducer,
  request: RequestReducer,
  admin: AdminReducer,
  address: AddressReducer,
});

const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
export default store;
