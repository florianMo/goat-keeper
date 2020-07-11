import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import { gameSlice } from './slices/gameSlice';

const rootReducer = combineReducers({ games: gameSlice.reducer });

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'gkState',
  storage: storage,
  whitelist: ['games'],
  stateReconciler: autoMergeLevel2,
};

const pReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: pReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
