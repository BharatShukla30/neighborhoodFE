import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import {
  GET_USER_CHATS_URL,
  GET_CHAT_MESSAGES_URL
} from "../../utils/apiURLs";

export const getUserChats = createAsyncThunk(
  "user/chats",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get(GET_USER_CHATS_URL);
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getChatMessages = createAsyncThunk(
  "chat/messages",
  async ({ groupId, page }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get(GET_CHAT_MESSAGES_URL(groupId, page));
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
