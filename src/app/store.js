import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../features/userAuth/userAuthSlice";
import adminAuthReducer from "../features/adminAuth/adminAuthSlice";
import carReducer from "../features/Car/carSlice";
import userReducer from "../features/userAuth/userAuthSlice";
import bookingReducer from "../features/Booking/bookingSlice";
import bookingPersisterReducer from "../features/Booking/bookingPersisterSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'booking',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig,bookingPersisterReducer)


export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
    car: carReducer,
    users: userReducer,
    booking: bookingReducer,
    persistedReducer
  },
});

export const persistor = persistStore(store);
