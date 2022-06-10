import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchGroups } from '../services/groups';
import { Loading } from '../common';

type GroupState = {
  id: string;
  name: string;
  loading: Loading;
};

const initialState: GroupState = {
  id: 'test',
  name: 'Group1',
  loading: Loading.Idle,
};
export const groupsSlice = createSlice({
  name: 'groups',
  initialState: initialState,
  reducers: {
    changeGroupName: (state, action: PayloadAction<string>) => {
      state.name = action.payload || 'Group2';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        return { ...state, name: 'api-loading' };
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        return { ...state, name: 'from-api' };
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        return { ...state, name: 'api-error' };
      });
  },
});

const groupsReducer = groupsSlice.reducer;

export const { changeGroupName } = groupsSlice.actions;
export const getGroupName = (state: RootState) => state.groups.name;

export default groupsReducer;
