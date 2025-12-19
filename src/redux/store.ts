import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import API slice
import { apiSlice } from "./apiSlict";

// Import placeholder API to ensure endpoints are injected
import "@/redux/features/placeholder/placeholderApi";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    apiSlice.reducerPath, // Don't persist API cache
  ],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, apiSlice.reducer);

// Create the store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["persist"],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Persistor for the store
export const persistor = persistStore(store);

// Define the root state type and dispatch type based on the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
