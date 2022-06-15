import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Axios/index';
import { Group } from '../../Models/Group';

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
  const response = await axiosInstance.get<Group[]>('group');
  return response.data;
});
