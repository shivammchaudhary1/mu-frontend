import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  Person,
  Business,
  Email,
  Phone,
  Flag,
  TrendingUp,
} from "@mui/icons-material";
import config from "../../config/config.js";

const CreateLeadForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    leadname: "",
    company: "",
    email: "",
    mobile: "",
    priority: "Medium",
    status: "New",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Priority options
  const priorityOptions = [
    { value: "High", label: "High Priority", color: "#f44336" },
    { value: "Medium", label: "Medium Priority", color: "#ff9800" },
    { value: "Low", label: "Low Priority", color: "#4caf50" },
  ];

  // Status options
  const statusOptions = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal",
    "Negotiation",
    "Won",
    "Lost",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (!formData.leadname.trim()) {
      setError("Lead name is required");
      setLoading(false);
      return;
    }

    // Email validation if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Console log the form data
    console.log("Form Data Submitted:", {
      ...formData,
      timestamp: new Date().toISOString(),
    });

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${config.BACKEND_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log("API Response:", result);

      if (response.ok && result.success) {
        setSuccess("Lead created successfully!");
        console.log("Lead Created:", result.data);

        // Reset form
        setFormData({
          leadname: "",
          company: "",
          email: "",
          mobile: "",
          priority: "Medium",
          status: "New",
        });

        // Call parent onSubmit if provided
        if (onSubmit) {
          onSubmit(result.data);
        }
      } else {
        setError(result.message || "Failed to create lead");
        console.error("Error Response:", result);
      }
    } catch (error) {
      console.error("Network Error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      leadname: "",
      company: "",
      email: "",
      mobile: "",
      priority: "Medium",
      status: "New",
    });
    setError("");
    setSuccess("");
    console.log("Form Reset");
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              mb: 3,
              color: "primary.main",
              fontWeight: "bold",
            }}
          >
            Create New Lead
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              {/* Lead Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="leadname"
                  label="Lead Name"
                  value={formData.leadname}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <Person sx={{ color: "action.active", mr: 1 }} />
                    ),
                  }}
                  helperText="Full name of the lead contact"
                />
              </Grid>

              {/* Company */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="company"
                  label="Company"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <Business sx={{ color: "action.active", mr: 1 }} />
                    ),
                  }}
                  helperText="Company or organization name"
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <Email sx={{ color: "action.active", mr: 1 }} />
                    ),
                  }}
                  helperText="Contact email address"
                />
              </Grid>

              {/* Mobile */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="mobile"
                  label="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <Phone sx={{ color: "action.active", mr: 1 }} />
                    ),
                  }}
                  helperText="Contact phone number"
                />
              </Grid>

              {/* Priority Dropdown */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="priority-label">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Flag sx={{ mr: 1 }} />
                      Priority
                    </Box>
                  </InputLabel>
                  <Select
                    labelId="priority-label"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    disabled={loading}
                    label="Priority"
                  >
                    {priorityOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              bgcolor: option.color,
                              mr: 2,
                            }}
                          />
                          {option.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Status Dropdown */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TrendingUp sx={{ mr: 1 }} />
                      Status
                    </Box>
                  </InputLabel>
                  <Select
                    labelId="status-label"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={loading}
                    label="Status"
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleReset}
                disabled={loading}
                sx={{ minWidth: 120 }}
              >
                Reset Form
              </Button>

              <Box sx={{ display: "flex", gap: 2 }}>
                {onCancel && (
                  <Button
                    variant="outlined"
                    onClick={onCancel}
                    disabled={loading}
                    sx={{ minWidth: 120 }}
                  >
                    Cancel
                  </Button>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading || !formData.leadname.trim()}
                  sx={{ minWidth: 120, position: "relative" }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Create Lead"
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateLeadForm;
