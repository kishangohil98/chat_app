import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Axios/index';
import { Group } from '../../Models/Group';

export const fetchGroupsAPI = async () => axiosInstance.get<Group[]>('group');

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
  const response = await fetchGroupsAPI();
  return response.data;
});
