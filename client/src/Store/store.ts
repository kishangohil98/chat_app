import { configureStore } from '@reduxjs/toolkit';
import groupsReducer from './slices/groupsSlice';
import userReducer from './slices/userSlice';
import newGroupReducer from './slices/newGroupsSlice';

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    user: userReducer,
    newGroups: newGroupReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
