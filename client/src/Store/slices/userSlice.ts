import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Loading } from '../common';
import { User } from '../../Models/User';

type UserState = {
  userData: User | undefined;
  loading: Loading;
  error: any;
};

const initialState: UserState = {
  userData: undefined,
  loading: Loading.Idle,
  error: undefined,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    getUserError: (state, action: PayloadAction<any>) => {
      state.userData = undefined;
      state.loading = Loading.Failed;
      state.error = action.payload;
    },
  },
});

const userReducer = userSlice.reducer;

export const { updateUser, getUserError } = userSlice.actions;
export const getUser = (state: RootState) => state.user.userData;

export default userReducer;
