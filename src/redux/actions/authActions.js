import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios";

axios.defaults.withCredentials = true;

export const loginUser = createAsyncThunk(
  "user/login",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const request = await axios.post(
        "/user/login",
        userCredentials
      );
      const response = await request.data;
      return response;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/signin",
  async (userDetails, {rejectWithValue}) => {
    try{
        const request = await axios.post("/user/register", userDetails);
        const response = await request.data;
        return response;
    }
    catch(error) {
        return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, {rejectWithValue}) => {
    await axios.get("/user/logout").then((response) => {
      return response.data;
    }).catch((error) => {
      return rejectWithValue(error.response.data.message);
    })
  }
)


export const loadUser = createAsyncThunk(
  "user/load",
  async (_, {rejectWithValue}) => {
    try{
      const request = await axios.get("/user/me");
      const response = await request.data;
      return response;
    }
    catch(error) {
      return rejectWithValue(error.response.data.message);
    }
  }
)