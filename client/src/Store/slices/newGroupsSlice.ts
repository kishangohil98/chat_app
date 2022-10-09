import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Loading } from '../common';
import { User } from '../../Models/User';
import { Group } from '../../Models/Group';
import { fetchNewGroups } from '../services/newGroups';

type NewGroupsState = {
  users: User[];
  groups: Group[];
  loading: Loading;
  error: any;
};

const initialState: NewGroupsState = {
  users: [],
  groups: [],
  loading: Loading.Idle,
  error: undefined,
};
export const newGroupsSlice = createSlice({
  name: 'newGroups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNewGroups.pending, (state) => ({
      ...state,
      users: [],
      groups: [],
      loading: Loading.Pending,
    }));
    builder.addCase(fetchNewGroups.fulfilled, (state, action) => ({
      ...state,
      users: action.payload.users,
      groups: action.payload.groups,
      loading: Loading.Succeeded,
    }));
    builder.addCase(fetchNewGroups.rejected, (state, action) => ({
      ...state,
      users: [],
      groups: [],
      error: action.payload,
      loading: Loading.Failed,
    }));
  },
});

const newGroupsReducer = newGroupsSlice.reducer;

// export const {} = newGroupsSlice.actions;
export const getNewGroups = (state: RootState) => state.newGroups;

export default newGroupsReducer;
