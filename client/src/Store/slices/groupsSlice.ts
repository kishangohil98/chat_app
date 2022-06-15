import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchGroups } from '../services/groups';
import { Loading } from '../common';
import { Group } from '../../Models/Group';

type GroupState = {
  groupData: Group[];
  loading: Loading;
  error: any;
};

const initialState: GroupState = {
  groupData: [],
  loading: Loading.Idle,
  error: undefined,
};
export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    changeGroupData: (state, action: PayloadAction<Group[]>) => {
      state.groupData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.pending, (state) => ({
      ...state,
      groupData: [],
      loading: Loading.Pending,
    }));
    builder.addCase(fetchGroups.fulfilled, (state, action) => ({
      ...state,
      groupData: action.payload,
      loading: Loading.Succeeded,
    }));
    builder.addCase(fetchGroups.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      loading: Loading.Failed,
    }));
  },
});

const groupsReducer = groupsSlice.reducer;

export const { changeGroupData } = groupsSlice.actions;
export const getGroup = (state: RootState) => state.groups;

export default groupsReducer;
