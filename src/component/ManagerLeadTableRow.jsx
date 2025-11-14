import React from "react";
import {
  TableCell,
  TableRow,
  Chip,
  Avatar,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import LeadActionMenu from "./leads/LeadActionMenu";

const ManagerLeadTableRow = ({
  lead,
  salesExecutive,
  onEdit,
  onView,
  onDelete,
  getPriorityColor,
  getStatusColor,
  getInitials,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <TableRow
      hover
      sx={{
        "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
        "&:hover": { backgroundColor: "action.selected" },
      }}
    >
      <TableCell>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
            {lead.leadname}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ID: {lead.id}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{lead.company}</Typography>
      </TableCell>

      <TableCell>
        <Box>
          <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
            {lead.email}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {lead.mobile}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="center">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {salesExecutive ? (
            <Tooltip
              title={`${
                salesExecutive.username ||
                salesExecutive.name ||
                "Sales Executive"
              } - ${salesExecutive.role}`}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: "0.75rem",
                    backgroundColor: "primary.main",
                  }}
                >
                  {getInitials(salesExecutive.username || salesExecutive.name)}
                </Avatar>
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="caption" sx={{ fontWeight: "medium" }}>
                    {salesExecutive.username ||
                      salesExecutive.name ||
                      "Unknown"}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block" }}
                  >
                    {salesExecutive.role}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          ) : (
            <Chip
              label="Unassigned"
              size="small"
              color="warning"
              variant="outlined"
            />
          )}
        </Box>
      </TableCell>

      <TableCell align="center">
        <Chip
          label={lead.priority}
          color={getPriorityColor(lead.priority)}
          size="small"
          sx={{ textTransform: "capitalize", minWidth: 70 }}
        />
      </TableCell>

      <TableCell align="center">
        <Chip
          label={lead.status}
          color={getStatusColor(lead.status)}
          size="small"
          sx={{ textTransform: "capitalize", minWidth: 85 }}
        />
      </TableCell>

      <TableCell align="center">
        <Typography variant="caption" color="text.secondary">
          {formatDate(lead.created_at)}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <LeadActionMenu
          lead={lead}
          onEdit={() => onEdit(lead)}
          onView={() => onView(lead)}
          onDelete={() => onDelete(lead)}
          showDelete={true} // Manager can delete leads
        />
      </TableCell>
    </TableRow>
  );
};

export default ManagerLeadTableRow;
