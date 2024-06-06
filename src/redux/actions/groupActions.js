import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";

import {
  USER_GROUPS_URL,
  CREATE_GROUP_URL,
  FETCH_GROUP_DETAILS_URL,
  FETCH_GROUP_MESSAGES_URL,
  UPDATE_GROUP_DETAILS_URL,
  NEAREST_GROUP_URL,
  ADD_USER_URL,
  REMOVE_USER_URL,
  MAKE_GROUP_PERMANENT_URL,
  FETCH_NEARBY_USERS_URL,
  CHECK_GROUP_NAME_UNIQUENESS_URL,
  LEAVE_GROUP_URL
} from "../../utils/apiURLs";

// User related actions
export const getUserGroups = createAsyncThunk(
  "user/get-user-groups",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get(USER_GROUPS_URL);
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Group related actions
export const createGroup = createAsyncThunk(
  "group/create",
  async (groupDetails, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post(CREATE_GROUP_URL, groupDetails);
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchGroupDetails = createAsyncThunk(
  "group/fetch-group-details",
  async (groupId, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get(FETCH_GROUP_DETAILS_URL(groupId));
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    } 
  }
); 
 
export const fetchGroupMessages = createAsyncThunk(
  "group/fetch-group-messages",
  async (groupId, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get(FETCH_GROUP_MESSAGES_URL(groupId));
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const updateGroupDetails = createAsyncThunk(
  "group/update-group-details",
  async (groupDetails, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.put(UPDATE_GROUP_DETAILS_URL, groupDetails);
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const nearestGroup = createAsyncThunk(
  "group/nearest-group",
  async (coordinates, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get(NEAREST_GROUP_URL(coordinates));
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "group/add-user",
  async (userDetails, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post(ADD_USER_URL, userDetails);
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const removeUser = createAsyncThunk(
  "group/remove-user",
  async (userDetails, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post(REMOVE_USER_URL, userDetails);
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const makeGroupPermanent = createAsyncThunk(
  "group/make-group-permanent",
  async (groupId, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.put(MAKE_GROUP_PERMANENT_URL, { groupId });
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchNearbyUsers = createAsyncThunk(
  "group/fetch-nearby-users",
  async (body, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get(FETCH_NEARBY_USERS_URL(body));
      const response = await request.data;
      console.log("fetch ", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const checkGroupNameUniqueness = createAsyncThunk(
  "group/is-group-unique",
  async (reqBody, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get(CHECK_GROUP_NAME_UNIQUENESS_URL(reqBody.name));
      const response = await request.data;
      response.groupName = reqBody.name;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const leaveGroup = createAsyncThunk(
  "group/remove-user",
  async (reqBody, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post(LEAVE_GROUP_URL, reqBody);
      const response = await request.data;
      response.groupName = reqBody.name;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
