import React from "react";
import { Menu, MenuItem, Typography, Chip, Divider } from "@mui/material";
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const LeadActionMenu = ({
  anchorEl,
  open,
  onClose,
  lead,
  onView,
  onEdit,
  onDelete,
  onStatusUpdate,
  onPriorityUpdate,
  canDelete = false,
  showQuickActions = true,
}) => {
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

  const statusOptions = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal",
    "Negotiation",
    "Won",
    "Lost",
  ];

  const priorityOptions = ["High", "Medium", "Low"];

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { minWidth: 200 },
      }}
    >
      {/* Main Actions */}
      <MenuItem
        onClick={() => {
          onView(lead);
          onClose();
        }}
      >
        <ViewIcon sx={{ mr: 1 }} fontSize="small" />
        View Details
      </MenuItem>

      <MenuItem
        onClick={() => {
          onEdit(lead);
          onClose();
        }}
      >
        <EditIcon sx={{ mr: 1 }} fontSize="small" />
        Edit Lead
      </MenuItem>

      {canDelete && (
        <MenuItem
          onClick={() => {
            onDelete(lead);
            onClose();
          }}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
          Delete Lead
        </MenuItem>
      )}

      {showQuickActions && (
        <>
          <Divider />

          {/* Quick Status Updates */}
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              Update Status:
            </Typography>
          </MenuItem>

          {statusOptions.map((status) => (
            <MenuItem
              key={status}
              onClick={() => {
                onStatusUpdate(lead.id, status);
                onClose();
              }}
              sx={{ pl: 3 }}
              disabled={lead?.status === status}
            >
              <Chip
                label={status}
                color={getStatusColor(status)}
                size="small"
                variant="outlined"
              />
            </MenuItem>
          ))}

          <Divider />

          {/* Quick Priority Updates */}
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              Update Priority:
            </Typography>
          </MenuItem>

          {priorityOptions.map((priority) => (
            <MenuItem
              key={priority}
              onClick={() => {
                onPriorityUpdate(lead.id, priority);
                onClose();
              }}
              sx={{ pl: 3 }}
              disabled={lead?.priority === priority}
            >
              <Chip
                label={priority}
                color={getPriorityColor(priority)}
                size="small"
              />
            </MenuItem>
          ))}
        </>
      )}
    </Menu>
  );
};

export default LeadActionMenu;
