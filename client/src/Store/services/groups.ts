import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Axios/index';

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
  const response = await axiosInstance.get('user/groups');
  return response.data;
});
