import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Axios/index';
import { Group } from '../../Models/Group';
import { User } from '../../Models/User';

export const fetchNewGroups = createAsyncThunk('groups/fetchNewGroups', async () => {
  const response = await axiosInstance.get<{
    users: User[];
    groups: Group[];
  }>('group/new');
  return response.data;
});
