import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios";
import { formUserCoordinatesObject } from "../../utils/helpers";

import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  UPDATE_USER_LOCATION_URL,
  LOAD_USER_URL,
  FETCH_CITIES_LIST_URL
} from "../../utils/apiURLs";


axios.defaults.withCredentials = true;

export const loginUser = createAsyncThunk(
  "authentication/login",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const request = await axios.post(LOGIN_URL, userCredentials);
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "authentication/signin",
  async (userDetails, { rejectWithValue }) => {
    try {
      const request = await axios.post(REGISTER_URL, userDetails);
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUserLocation = createAsyncThunk(
  "user/update-user-location",
  async (locationDetails, { rejectWithValue }) => {
    try {
      const request = await axios.put(
        UPDATE_USER_LOCATION_URL,
        locationDetails
      );
      const response = await request.data;
      response.locationDetails = formUserCoordinatesObject(
        locationDetails,
        response.user_coordinates
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "authentication/logout",
  async (_, { rejectWithValue }) => {
    await axios
      .get(LOGOUT_URL)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.message);
      });
  }
);

export const loadUser = createAsyncThunk(
  "user/load",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axios.get(LOAD_USER_URL);
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchCitiesList = createAsyncThunk(
  "user/fetch-cities",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axios.get(FETCH_CITIES_LIST_URL);
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
