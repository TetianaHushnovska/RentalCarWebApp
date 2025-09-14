import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import favCarsReducer from "./favCars/slice";
import carsReducer from "./cars/slice";
import bookingsReducer from "./bookings/slice";

const rootReducer = combineReducers({
  cars: carsReducer,
  favoritesCars: favCarsReducer,
  bookings: bookingsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favoritesCars"], // тільки зберігаємо улюблені
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
