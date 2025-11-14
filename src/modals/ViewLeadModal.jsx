import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Flag as FlagIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";

const ViewLeadModal = ({ open, onClose, lead, onEdit, salesExecutive }) => {
  if (!lead) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "primary";
      case "Contacted":
        return "info";
      case "Qualified":
        return "success";
      case "Proposal":
        return "warning";
      case "Negotiation":
        return "secondary";
      case "Won":
        return "success";
      case "Lost":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
          Lead Details
        </Typography>
        <IconButton onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Lead Header */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar
                sx={{ mr: 2, bgcolor: "primary.main", width: 56, height: 56 }}
              >
                <PersonIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {lead.leadname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lead ID: {lead.id}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Company */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <BusinessIcon sx={{ mr: 2, color: "action.active" }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Company
                </Typography>
                <Typography variant="body1">
                  {lead.company || "Not specified"}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              Contact Information
            </Typography>

            {lead.email && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <EmailIcon
                  sx={{ mr: 2, color: "action.active" }}
                  fontSize="small"
                />
                <Typography variant="body2">{lead.email}</Typography>
              </Box>
            )}

            {lead.mobile && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PhoneIcon
                  sx={{ mr: 2, color: "action.active" }}
                  fontSize="small"
                />
                <Typography variant="body2">{lead.mobile}</Typography>
              </Box>
            )}

            {!lead.email && !lead.mobile && (
              <Typography variant="body2" color="text.secondary">
                No contact information available
              </Typography>
            )}
          </Grid>

          {/* Sales Executive Assignment (for managers/admins) */}
          {salesExecutive && (
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                gutterBottom
                color="text.secondary"
              >
                Assigned Sales Executive
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Avatar
                  sx={{
                    mr: 2,
                    width: 32,
                    height: 32,
                    fontSize: "0.875rem",
                    bgcolor: "primary.main",
                  }}
                >
                  {(salesExecutive.username || salesExecutive.name || "SE")
                    .charAt(0)
                    .toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                    {salesExecutive.username ||
                      salesExecutive.name ||
                      "Unknown Executive"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {salesExecutive.role || "Sales Executive"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {!salesExecutive && (
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                gutterBottom
                color="text.secondary"
              >
                Assignment Status
              </Typography>
              <Chip
                label="Unassigned"
                color="warning"
                variant="outlined"
                size="small"
              />
            </Grid>
          )}

          {/* Status & Priority */}
          <Grid item xs={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TrendingUpIcon sx={{ mr: 2, color: "action.active" }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={lead.status}
                  color={getStatusColor(lead.status)}
                  size="small"
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FlagIcon sx={{ mr: 2, color: "action.active" }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Priority
                </Typography>
                <Chip
                  label={lead.priority}
                  color={getPriorityColor(lead.priority)}
                  size="small"
                />
              </Box>
            </Box>
          </Grid>

          {/* Owner Information */}
          {lead.owner_name && (
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PersonIcon sx={{ mr: 2, color: "action.active" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Assigned to
                  </Typography>
                  <Typography variant="body1">{lead.owner_name}</Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {/* Created Date */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CalendarIcon sx={{ mr: 2, color: "action.active" }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Created
                </Typography>
                <Typography variant="body1">
                  {formatDate(lead.created_at)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose}>Close</Button>
        {onEdit && (
          <Button
            onClick={() => {
              onEdit(lead);
              onClose();
            }}
            variant="contained"
          >
            Edit Lead
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ViewLeadModal;
