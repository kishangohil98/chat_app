import { configureStore } from '@reduxjs/toolkit';
import groupsReducer from './slices/groupsSlice';
import userReducer from './slices/userSlice';
import newGroupReducer from './slices/newGroupsSlice';
import currentConversationReducer from './slices/currentConversationSlice';

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    user: userReducer,
    newGroups: newGroupReducer,
    currentConversation: currentConversationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
