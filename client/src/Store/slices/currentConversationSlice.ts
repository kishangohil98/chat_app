import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Loading } from '../common';
import { User } from '../../Models/User';
import { fetchCurrentConversationMessages } from '../services/currentConversation';
import { Group } from '../../Models/Group';
import { Message } from '../../Models/Message';

export type CurrentConversationState = {
  user: User | null;
  currentGroup: Group | null;
  loading: Loading;
  error: any;
  messages: Message[];
  messagesLoading: Loading;
};

const initialState: CurrentConversationState = {
  user: null,
  currentGroup: null,
  loading: Loading.Idle,
  error: undefined,
  messages: [],
  messagesLoading: Loading.Idle,
};

export const currentConversationSlice = createSlice({
  name: 'currentConversation',
  initialState,
  reducers: {
    changeCurrentGroup: (state, action: PayloadAction<Group>) => {
      state.currentGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentConversationMessages.pending, (state) => ({
      ...state,
      messagesLoading: Loading.Pending,
      messages: [],
    }));
    builder.addCase(fetchCurrentConversationMessages.fulfilled, (state, action) => ({
      ...state,
      messagesLoading: Loading.Idle,
      messages: action.payload,
    }));
    builder.addCase(fetchCurrentConversationMessages.rejected, (state, action) => ({
      ...state,
      messagesLoading: Loading.Failed,
    }));
  },
});

const currentConversationReducer = currentConversationSlice.reducer;

export const { changeCurrentGroup } = currentConversationSlice.actions;

export default currentConversationReducer;
