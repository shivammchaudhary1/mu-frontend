import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config/config.js";

const initialState = {
  isAuthenticated: !!localStorage.getItem("crmtoken"),
  user: JSON.parse(localStorage.getItem("crmuser")) || null,
  token: localStorage.getItem("crmtoken") || null,
  role: localStorage.getItem("crmrole") || null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${config.BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${config.BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("crmtoken");
      localStorage.removeItem("crmuser");
      localStorage.removeItem("crmrole");
    },
    setLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;
      // Store in localStorage
      localStorage.setItem("crmtoken", JSON.stringify(action.payload.token));
      localStorage.setItem("crmuser", JSON.stringify(action.payload.user));
      localStorage.setItem("crmrole", JSON.stringify(action.payload.user.role));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Store in localStorage
      localStorage.setItem("crmtoken", JSON.stringify(action.payload.token));
      localStorage.setItem("crmuser", JSON.stringify(action.payload.user));
      localStorage.setItem("crmrole", JSON.stringify(action.payload.user.role));
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Store in localStorage
      localStorage.setItem("crmtoken", JSON.stringify(action.payload.token));
      localStorage.setItem("crmuser", JSON.stringify(action.payload.user));
      localStorage.setItem("crmrole", JSON.stringify(action.payload.user.role));
    });
  },
});

export const { setLogout, setLogin } = authSlice.actions;
// selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.role;

export default authSlice.reducer;
