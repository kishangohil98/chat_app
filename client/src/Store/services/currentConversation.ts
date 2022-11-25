import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Axios/index';
import { Message } from '../../Models/Message';
import { User } from '../../Models/User';

export const fetchCurrentConversationMessages = createAsyncThunk(
  'currentConversation/messages',
  async (groupId: string) => {
    const response = await axiosInstance.get<Message[]>(`message/${groupId}`);
    return response.data;
  },
);
