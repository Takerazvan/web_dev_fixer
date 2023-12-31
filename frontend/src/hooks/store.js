import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  html: "",
  css: "",
  js: "",
  userId: "",
  penId: "",
  penOwner: "",
  loggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_HTML":
      return { ...state, html: action.payload };
    case "UPDATE_CSS":
      return { ...state, css: action.payload };
    case "UPDATE_JS":
      return { ...state, js: action.payload };
    case "UPDATE_ID":
      return { ...state, userId: action.payload };
    case "SET_LOGGED_IN":
      console.log(initialState.loggedIn);
      return { ...state, loggedIn: action.payload };
    case "SET_Owner":
      return { ...state, penOwner: action.payload };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export const persistor = persistStore(store);
