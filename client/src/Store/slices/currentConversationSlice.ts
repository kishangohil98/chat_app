import { createSlice } from '@reduxjs/toolkit';
import { Loading } from '../common';
import { User } from '../../Models/User';
import { fetchCurrentConversationUser } from '../services/currentConversation';

export type CurrentConversationState = {
  user: User | null;
  loading: Loading;
  error: any;
};

const initialState: CurrentConversationState = {
  user: null,
  loading: Loading.Idle,
  error: undefined,
};

export const currentConversationSlice = createSlice({
  name: 'currentConversation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentConversationUser.pending, (state) => ({
      ...state,
      user: null,
      loading: Loading.Pending,
      error: undefined,
    }));
    builder.addCase(fetchCurrentConversationUser.fulfilled, (state, action) => ({
      ...state,
      user: action.payload,
      loading: Loading.Succeeded,
    }));
    builder.addCase(fetchCurrentConversationUser.rejected, (state, action) => ({
      ...state,
      user: null,
      error: action.payload,
      loading: Loading.Failed,
    }));
  },
});

const currentConversationReducer = currentConversationSlice.reducer;

export default currentConversationReducer;
