import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import ManagerLeadTableRow from "./ManagerLeadTableRow";

const ManagerLeadsTable = ({
  leads = [],
  salesExecutives = [],
  onEdit,
  onView,
  onDelete,
  loading = false,
}) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
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
    switch (status?.toLowerCase()) {
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

  // Helper function to get sales executive info
  const getSalesExecutiveInfo = (ownerId) => {
    return salesExecutives.find((exec) => exec.id === parseInt(ownerId));
  };

  // Helper function to get initials for avatar
  const getInitials = (name) => {
    if (!name) return "SE";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
        }}
      >
        <Typography>Loading leads...</Typography>
      </Box>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No leads found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create your first lead to get started
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table sx={{ minWidth: 750 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "primary.main" }}>
            <TableCell
              sx={{ color: "primary.contrastText", fontWeight: "bold" }}
            >
              Lead Name
            </TableCell>
            <TableCell
              sx={{ color: "primary.contrastText", fontWeight: "bold" }}
            >
              Company
            </TableCell>
            <TableCell
              sx={{ color: "primary.contrastText", fontWeight: "bold" }}
            >
              Contact
            </TableCell>
            <TableCell
              sx={{
                color: "primary.contrastText",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Assigned To
            </TableCell>
            <TableCell
              sx={{
                color: "primary.contrastText",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Priority
            </TableCell>
            <TableCell
              sx={{
                color: "primary.contrastText",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Status
            </TableCell>
            <TableCell
              sx={{
                color: "primary.contrastText",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Created
            </TableCell>
            <TableCell
              sx={{
                color: "primary.contrastText",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead) => (
            <ManagerLeadTableRow
              key={lead.id}
              lead={lead}
              salesExecutive={getSalesExecutiveInfo(lead.owner_id)}
              onEdit={onEdit}
              onView={onView}
              onDelete={onDelete}
              getPriorityColor={getPriorityColor}
              getStatusColor={getStatusColor}
              getInitials={getInitials}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManagerLeadsTable;
