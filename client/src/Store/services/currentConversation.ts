import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Axios/index';
import { User } from '../../Models/User';

export const fetchCurrentConversationUser = createAsyncThunk(
  'currentConversation/user',
  async (userId: string) => {
    const response = await axiosInstance.get<User>(`user/${userId}`);
    return response.data;
  },
);
