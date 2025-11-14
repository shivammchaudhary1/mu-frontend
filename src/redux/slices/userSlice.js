import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config/config.js";

// Helper function to get auth token
const getAuthToken = () => localStorage.getItem("crmtoken");

// Helper function to create auth headers
const createAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getAuthToken()}`,
});

const initialState = {
  users: [],
  salesExecutives: [],
  loading: false,
  error: null,
  success: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${config.BACKEND_URL}/api/users`, {
        method: "GET",
        headers: createAuthHeaders(),
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch users");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch sales executives only
export const fetchSalesExecutives = createAsyncThunk(
  "users/fetchSalesExecutives",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${config.BACKEND_URL}/api/users?role=sales_executive`,
        {
          method: "GET",
          headers: createAuthHeaders(),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || "Failed to fetch sales executives"
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    resetUserState: (state) => {
      state.users = [];
      state.salesExecutives = [];
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Sales Executives
    builder
      .addCase(fetchSalesExecutives.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesExecutives.fulfilled, (state, action) => {
        state.loading = false;
        state.salesExecutives = action.payload.data || action.payload;
      })
      .addCase(fetchSalesExecutives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearError, clearSuccess, resetUserState } = userSlice.actions;

// Selectors
export const selectUsers = (state) => state.users.users;
export const selectSalesExecutives = (state) => state.users.salesExecutives;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;
export const selectUsersSuccess = (state) => state.users.success;

// Export reducer
export default userSlice.reducer;
