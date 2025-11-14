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
  leads: [],
  currentLead: null,
  myLeads: [],
  leadStats: null,
  loading: false,
  error: null,
  success: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
  },
  filters: {
    status: "",
    priority: "",
    owner_id: "",
    search: "",
  },
};

// Async Thunks for API calls

// Create a new lead
export const createLead = createAsyncThunk(
  "leads/createLead",
  async (leadData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${config.BACKEND_URL}/api/leads`, {
        method: "POST",
        headers: createAuthHeaders(),
        body: JSON.stringify(leadData),
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to create lead");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get all leads with filters
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();

      // Add filters to query params
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.priority) queryParams.append("priority", filters.priority);
      if (filters.owner_id) queryParams.append("owner_id", filters.owner_id);

      const queryString = queryParams.toString();
      const url = `${config.BACKEND_URL}/api/leads${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: createAuthHeaders(),
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch leads");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get lead by ID
export const fetchLeadById = createAsyncThunk(
  "leads/fetchLeadById",
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${config.BACKEND_URL}/api/leads/${leadId}`,
        {
          method: "GET",
          headers: createAuthHeaders(),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch lead");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update lead
export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ leadId, updateData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${config.BACKEND_URL}/api/leads/${leadId}`,
        {
          method: "PUT",
          headers: createAuthHeaders(),
          body: JSON.stringify(updateData),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to update lead");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update lead status
export const updateLeadStatus = createAsyncThunk(
  "leads/updateLeadStatus",
  async ({ leadId, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${config.BACKEND_URL}/api/leads/${leadId}/status`,
        {
          method: "PATCH",
          headers: createAuthHeaders(),
          body: JSON.stringify({ status }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to update lead status");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update lead priority
export const updateLeadPriority = createAsyncThunk(
  "leads/updateLeadPriority",
  async ({ leadId, priority }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${config.BACKEND_URL}/api/leads/${leadId}/priority`,
        {
          method: "PATCH",
          headers: createAuthHeaders(),
          body: JSON.stringify({ priority }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || "Failed to update lead priority"
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete lead
export const deleteLead = createAsyncThunk(
  "leads/deleteLead",
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${config.BACKEND_URL}/api/leads/${leadId}`,
        {
          method: "DELETE",
          headers: createAuthHeaders(),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to delete lead");
      }

      return { leadId, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get my leads (for sales executives)
export const fetchMyLeads = createAsyncThunk(
  "leads/fetchMyLeads",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${config.BACKEND_URL}/api/leads/my/leads`, {
        method: "GET",
        headers: createAuthHeaders(),
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch your leads");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get lead statistics
export const fetchLeadStats = createAsyncThunk(
  "leads/fetchLeadStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${config.BACKEND_URL}/api/leads/stats/overview`,
        {
          method: "GET",
          headers: createAuthHeaders(),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || "Failed to fetch lead statistics"
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Lead slice
const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Clear success
    clearSuccess: (state) => {
      state.success = null;
    },

    // Set filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // Clear filters
    clearFilters: (state) => {
      state.filters = {
        status: "",
        priority: "",
        owner_id: "",
        search: "",
      };
    },

    // Set current lead
    setCurrentLead: (state, action) => {
      state.currentLead = action.payload;
    },

    // Clear current lead
    clearCurrentLead: (state) => {
      state.currentLead = null;
    },

    // Reset state
    resetLeadState: (state) => {
      state.leads = [];
      state.currentLead = null;
      state.myLeads = [];
      state.leadStats = null;
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // Create Lead
    builder
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.leads.unshift(action.payload.data);
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Leads
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload.data;
        state.pagination.total = action.payload.count;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Lead by ID
    builder
      .addCase(fetchLeadById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLead = action.payload.data;
      })
      .addCase(fetchLeadById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Lead
    builder
      .addCase(updateLead.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.currentLead = action.payload.data;

        // Update lead in leads array
        const index = state.leads.findIndex(
          (lead) => lead.id === action.payload.data.id
        );
        if (index !== -1) {
          state.leads[index] = action.payload.data;
        }
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Lead Status
    builder
      .addCase(updateLeadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        // Update lead in current lead
        if (
          state.currentLead &&
          state.currentLead.id === action.payload.data.id
        ) {
          state.currentLead = action.payload.data;
        }

        // Update lead in leads array
        const index = state.leads.findIndex(
          (lead) => lead.id === action.payload.data.id
        );
        if (index !== -1) {
          state.leads[index] = action.payload.data;
        }
      })
      .addCase(updateLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Lead Priority
    builder
      .addCase(updateLeadPriority.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateLeadPriority.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        // Update lead in current lead
        if (
          state.currentLead &&
          state.currentLead.id === action.payload.data.id
        ) {
          state.currentLead = action.payload.data;
        }

        // Update lead in leads array
        const index = state.leads.findIndex(
          (lead) => lead.id === action.payload.data.id
        );
        if (index !== -1) {
          state.leads[index] = action.payload.data;
        }
      })
      .addCase(updateLeadPriority.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Lead
    builder
      .addCase(deleteLead.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        // Remove lead from leads array
        state.leads = state.leads.filter(
          (lead) => lead.id !== action.payload.leadId
        );

        // Clear current lead if it was deleted
        if (
          state.currentLead &&
          state.currentLead.id === action.payload.leadId
        ) {
          state.currentLead = null;
        }
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch My Leads
    builder
      .addCase(fetchMyLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.myLeads = action.payload.data;
      })
      .addCase(fetchMyLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Lead Stats
    builder
      .addCase(fetchLeadStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadStats.fulfilled, (state, action) => {
        state.loading = false;
        state.leadStats = action.payload.data;
      })
      .addCase(fetchLeadStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  clearError,
  clearSuccess,
  setFilters,
  clearFilters,
  setCurrentLead,
  clearCurrentLead,
  resetLeadState,
} = leadSlice.actions;

// Selectors
export const selectLeads = (state) => state.leads.leads;
export const selectCurrentLead = (state) => state.leads.currentLead;
export const selectMyLeads = (state) => state.leads.myLeads;
export const selectLeadStats = (state) => state.leads.leadStats;
export const selectLeadsLoading = (state) => state.leads.loading;
export const selectLeadsError = (state) => state.leads.error;
export const selectLeadsSuccess = (state) => state.leads.success;
export const selectLeadFilters = (state) => state.leads.filters;
export const selectLeadPagination = (state) => state.leads.pagination;

// Export reducer
export default leadSlice.reducer;
