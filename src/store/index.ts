import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice'; // Your auth slice

// Config for redux-persist
const persistConfig = {
    key: 'verdefy',
    version: 1,
    storage,
};

// Combine your reducers (you can add more here if needed)
const rootReducer = combineReducers({
    auth: authReducer,
});

// RootState type for use with selectors and in components
export type RootState = ReturnType<typeof rootReducer>;

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with redux-persist and redux-thunk (automatically included)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Create the persistor instance
const persistor = persistStore(store);

// Define types for use with hooks and dispatch
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

// Export store and persistor for use in your application
export { store, persistor };
