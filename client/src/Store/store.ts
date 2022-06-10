import { configureStore } from '@reduxjs/toolkit';
import groupsReducer from './slices/groupsSlice';

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
