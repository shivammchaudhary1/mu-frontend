import React from "react";
import {
  Box,
  Chip,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

const LeadTableRow = ({
  lead,
  onMenuClick,
  showOwner = false,
  getPriorityColor,
  getStatusColor,
  formatDate,
}) => {
  return (
    <TableRow hover>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">
              {lead.leadname}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: {lead.id}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BusinessIcon
            sx={{ mr: 1, color: "action.active" }}
            fontSize="small"
          />
          <Typography variant="body2">{lead.company || "N/A"}</Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Box>
          {lead.email && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <EmailIcon
                sx={{ mr: 1, color: "action.active" }}
                fontSize="small"
              />
              <Typography variant="body2">{lead.email}</Typography>
            </Box>
          )}
          {lead.mobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PhoneIcon
                sx={{ mr: 1, color: "action.active" }}
                fontSize="small"
              />
              <Typography variant="body2">{lead.mobile}</Typography>
            </Box>
          )}
          {!lead.email && !lead.mobile && (
            <Typography variant="body2" color="text.secondary">
              No contact info
            </Typography>
          )}
        </Box>
      </TableCell>

      <TableCell>
        <Chip
          label={lead.priority}
          color={getPriorityColor(lead.priority)}
          size="small"
        />
      </TableCell>

      <TableCell>
        <Chip
          label={lead.status}
          color={getStatusColor(lead.status)}
          size="small"
          variant="outlined"
        />
      </TableCell>

      {showOwner && (
        <TableCell>
          <Typography variant="body2">
            {lead.owner_name || "Unassigned"}
          </Typography>
        </TableCell>
      )}

      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {formatDate(lead.created_at)}
        </Typography>
      </TableCell>

      <TableCell>
        <Tooltip title="More actions">
          <IconButton onClick={(e) => onMenuClick(e, lead)} size="small">
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default LeadTableRow;
