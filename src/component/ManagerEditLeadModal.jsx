import React, { useState, useEffect } from "react";
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
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateLead } from "../redux/slices/leadSlice.js";
import { fetchSalesExecutives } from "../redux/slices/userSlice.js";
import { showToast } from "../redux/slices/toastSlice.js";

const ManagerEditLeadModal = ({ open, onClose, lead }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.leads);
  const { salesExecutives, loading: usersLoading } = useSelector(
    (state) => state.users
  );

  const [formData, setFormData] = useState({
    leadname: "",
    company: "",
    email: "",
    mobile: "",
    priority: "medium",
    status: "new",
    owner_id: "",
  });

  const [errors, setErrors] = useState({});

  // Update form data when lead prop changes
  useEffect(() => {
    if (open && lead) {
      setFormData({
        leadname: lead.leadname || "",
        company: lead.company || "",
        email: lead.email || "",
        mobile: lead.mobile || "",
        priority: lead.priority || "medium",
        status: lead.status || "new",
        owner_id: lead.owner_id || "",
      });
    }
  }, [open, lead]);

  // Fetch sales executives when modal opens
  useEffect(() => {
    if (open) {
      dispatch(fetchSalesExecutives());
    }
  }, [open, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.leadname.trim()) {
      newErrors.leadname = "Lead name is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^\+?[1-9]\d{9,14}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number is invalid";
    }

    if (!formData.owner_id) {
      newErrors.owner_id = "Please assign a sales executive";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(
        updateLead({
          id: lead.id,
          updateData: formData,
        })
      ).unwrap();
      dispatch(
        showToast({ message: "Lead updated successfully!", type: "success" })
      );
      handleClose();
    } catch (error) {
      dispatch(
        showToast({ message: error || "Failed to update lead", type: "error" })
      );
    }
  };

  const handleClose = () => {
    setFormData({
      leadname: "",
      company: "",
      email: "",
      mobile: "",
      priority: "medium",
      status: "new",
      owner_id: "",
    });
    setErrors({});
    onClose();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "info";
      default:
        return "default";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "info";
      case "contacted":
        return "primary";
      case "qualified":
        return "warning";
      case "converted":
        return "success";
      case "lost":
        return "error";
      default:
        return "default";
    }
  };

  // Find currently assigned sales executive
  const currentSalesExecutive = salesExecutives.find(
    (exec) => exec.id === parseInt(formData.owner_id)
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="h2">
          Edit Lead
        </Typography>
        {lead && (
          <Typography variant="body2" color="text.secondary">
            Lead ID: {lead.id}
          </Typography>
        )}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              name="leadname"
              label="Lead Name"
              value={formData.leadname}
              onChange={handleChange}
              error={!!errors.leadname}
              helperText={errors.leadname}
              fullWidth
              required
            />

            <TextField
              name="company"
              label="Company"
              value={formData.company}
              onChange={handleChange}
              error={!!errors.company}
              helperText={errors.company}
              fullWidth
              required
            />

            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
            />

            <TextField
              name="mobile"
              label="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              fullWidth
              required
            />

            <FormControl fullWidth required error={!!errors.owner_id}>
              <InputLabel>Assign to Sales Executive</InputLabel>
              <Select
                name="owner_id"
                value={formData.owner_id}
                onChange={handleChange}
                label="Assign to Sales Executive"
                disabled={usersLoading}
              >
                {salesExecutives.map((executive) => (
                  <MenuItem key={executive.id} value={executive.id}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography>
                        {executive.username ||
                          executive.name ||
                          `User ${executive.id}`}
                      </Typography>
                      <Chip
                        label={executive.role}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              {errors.owner_id && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, ml: 1.5 }}
                >
                  {errors.owner_id}
                </Typography>
              )}
              {currentSalesExecutive && (
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{ mt: 0.5, ml: 1.5 }}
                >
                  Currently assigned to:{" "}
                  {currentSalesExecutive.username || currentSalesExecutive.name}
                </Typography>
              )}
            </FormControl>

            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  label="Priority"
                >
                  <MenuItem value="low">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      Low
                      <Chip
                        label="Low"
                        size="small"
                        color={getPriorityColor("low")}
                      />
                    </Box>
                  </MenuItem>
                  <MenuItem value="medium">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      Medium
                      <Chip
                        label="Medium"
                        size="small"
                        color={getPriorityColor("medium")}
                      />
                    </Box>
                  </MenuItem>
                  <MenuItem value="high">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      High
                      <Chip
                        label="High"
                        size="small"
                        color={getPriorityColor("high")}
                      />
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="new">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      New
                      <Chip
                        label="New"
                        size="small"
                        color={getStatusColor("new")}
                      />
                    </Box>
                  </MenuItem>
                  <MenuItem value="contacted">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      Contacted
                      <Chip
                        label="Contacted"
                        size="small"
                        color={getStatusColor("contacted")}
                      />
                    </Box>
                  </MenuItem>
                  <MenuItem value="qualified">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      Qualified
                      <Chip
                        label="Qualified"
                        size="small"
                        color={getStatusColor("qualified")}
                      />
                    </Box>
                  </MenuItem>
                  <MenuItem value="converted">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      Converted
                      <Chip
                        label="Converted"
                        size="small"
                        color={getStatusColor("converted")}
                      />
                    </Box>
                  </MenuItem>
                  <MenuItem value="lost">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      Lost
                      <Chip
                        label="Lost"
                        size="small"
                        color={getStatusColor("lost")}
                      />
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || usersLoading}
          >
            {loading ? "Updating..." : "Update Lead"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ManagerEditLeadModal;
