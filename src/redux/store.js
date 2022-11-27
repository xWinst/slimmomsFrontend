import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
import userReducer from './userReducers';
import productSlice from './productReducers';

const persistConfig = {
    key: 'user',
    storage,
    whitelist: ['refreshToken'],
};

const rootReducer = combineReducers({
    user: persistReducer(persistConfig, userReducer),
    product: productSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
                ignoredActionPaths: ['payload'],
            },
        }),
});
export const persistor = persistStore(store);
