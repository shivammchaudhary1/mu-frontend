import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  Person,
  Business,
  Email,
  Phone,
  Flag,
  TrendingUp,
} from "@mui/icons-material";

const EditLeadModal = ({
  open,
  onClose,
  lead,
  onSave,
  loading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState({
    leadname: "",
    company: "",
    email: "",
    mobile: "",
    priority: "Medium",
    status: "New",
  });

  const [formErrors, setFormErrors] = useState({});

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

  // Initialize form data when lead changes
  const initialFormData = React.useMemo(() => {
    if (lead) {
      return {
        leadname: lead.leadname || "",
        company: lead.company || "",
        email: lead.email || "",
        mobile: lead.mobile || "",
        priority: lead.priority || "Medium",
        status: lead.status || "New",
      };
    }
    return {
      leadname: "",
      company: "",
      email: "",
      mobile: "",
      priority: "Medium",
      status: "New",
    };
  }, [lead]);

  React.useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.leadname.trim()) {
      errors.leadname = "Lead name is required";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave(lead.id, formData);
  };

  const handleClose = () => {
    setFormErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="div">
          Edit Lead
        </Typography>
        <IconButton onClick={handleClose} size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3} sx={{ mt: 1 }}>
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
                error={!!formErrors.leadname}
                helperText={formErrors.leadname}
                InputProps={{
                  startAdornment: (
                    <Person sx={{ color: "action.active", mr: 1 }} />
                  ),
                }}
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
                error={!!formErrors.email}
                helperText={formErrors.email}
                InputProps={{
                  startAdornment: (
                    <Email sx={{ color: "action.active", mr: 1 }} />
                  ),
                }}
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
              />
            </Grid>

            {/* Priority */}
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

            {/* Status */}
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
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !formData.leadname.trim()}
          sx={{ minWidth: 100 }}
        >
          {loading ? <CircularProgress size={24} /> : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditLeadModal;
