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
  dashboardStats: null,
  managers: [],
  salesExecutives: [],
  salesRecords: [],
  auditLogs: [],
  pagination: {
    managers: { page: 1, limit: 10, total: 0, pages: 0 },
    salesExecutives: { page: 1, limit: 10, total: 0, pages: 0 },
    salesRecords: { page: 1, limit: 10, total: 0, pages: 0 },
    auditLogs: { page: 1, limit: 10, total: 0, pages: 0 },
  },
  loading: {
    dashboard: false,
    managers: false,
    salesExecutives: false,
    salesRecords: false,
    auditLogs: false,
  },
  error: null,
};

// Fetch dashboard statistics
export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${config.BACKEND_URL}/api/admin/dashboard`,
        {
          method: "GET",
          headers: createAuthHeaders(),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || "Failed to fetch dashboard statistics"
        );
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch managers
export const fetchManagers = createAsyncThunk(
  "admin/fetchManagers",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
      });

      const response = await fetch(
        `${config.BACKEND_URL}/api/admin/managers?${params}`,
        {
          method: "GET",
          headers: createAuthHeaders(),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch managers");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch sales executives
export const fetchSalesExecutives = createAsyncThunk(
  "admin/fetchSalesExecutives",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
      });

      const response = await fetch(
        `${config.BACKEND_URL}/api/admin/sales-executives?${params}`,
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

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch sales records
export const fetchSalesRecords = createAsyncThunk(
  "admin/fetchSalesRecords",
  async (
    { page = 1, limit = 10, search = "", status = "" },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        status,
      });

      const response = await fetch(
        `${config.BACKEND_URL}/api/admin/sales-records?${params}`,
        {
          method: "GET",
          headers: createAuthHeaders(),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch sales records");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch audit logs
export const fetchAuditLogs = createAsyncThunk(
  "admin/fetchAuditLogs",
  async (
    { page = 1, limit = 10, search = "", action = "" },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        action,
      });

      const response = await fetch(
        `${config.BACKEND_URL}/api/admin/audit-logs?${params}`,
        {
          method: "GET",
          headers: createAuthHeaders(),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch audit logs");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading.dashboard = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading.dashboard = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading.dashboard = false;
        state.error = action.payload;
      })

      // Managers
      .addCase(fetchManagers.pending, (state) => {
        state.loading.managers = true;
        state.error = null;
      })
      .addCase(fetchManagers.fulfilled, (state, action) => {
        state.loading.managers = false;
        state.managers = action.payload.managers;
        state.pagination.managers = action.payload.pagination;
      })
      .addCase(fetchManagers.rejected, (state, action) => {
        state.loading.managers = false;
        state.error = action.payload;
      })

      // Sales executives
      .addCase(fetchSalesExecutives.pending, (state) => {
        state.loading.salesExecutives = true;
        state.error = null;
      })
      .addCase(fetchSalesExecutives.fulfilled, (state, action) => {
        state.loading.salesExecutives = false;
        state.salesExecutives = action.payload.salesExecutives;
        state.pagination.salesExecutives = action.payload.pagination;
      })
      .addCase(fetchSalesExecutives.rejected, (state, action) => {
        state.loading.salesExecutives = false;
        state.error = action.payload;
      })

      // Sales records
      .addCase(fetchSalesRecords.pending, (state) => {
        state.loading.salesRecords = true;
        state.error = null;
      })
      .addCase(fetchSalesRecords.fulfilled, (state, action) => {
        state.loading.salesRecords = false;
        state.salesRecords = action.payload.leads;
        state.pagination.salesRecords = action.payload.pagination;
      })
      .addCase(fetchSalesRecords.rejected, (state, action) => {
        state.loading.salesRecords = false;
        state.error = action.payload;
      })

      // Audit logs
      .addCase(fetchAuditLogs.pending, (state) => {
        state.loading.auditLogs = true;
        state.error = null;
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.loading.auditLogs = false;
        state.auditLogs = action.payload.auditLogs;
        state.pagination.auditLogs = action.payload.pagination;
      })
      .addCase(fetchAuditLogs.rejected, (state, action) => {
        state.loading.auditLogs = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setError } = adminSlice.actions;

// Selectors
export const selectDashboardStats = (state) => state.admin.dashboardStats;
export const selectManagers = (state) => state.admin.managers;
export const selectSalesExecutives = (state) => state.admin.salesExecutives;
export const selectSalesRecords = (state) => state.admin.salesRecords;
export const selectAuditLogs = (state) => state.admin.auditLogs;
export const selectPagination = (state) => state.admin.pagination;
export const selectLoading = (state) => state.admin.loading;
export const selectError = (state) => state.admin.error;

export default adminSlice.reducer;
