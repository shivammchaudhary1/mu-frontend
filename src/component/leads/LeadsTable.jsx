import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import LeadTableRow from "./LeadTableRow";

const LeadsTable = ({
  leads,
  loading,
  onMenuClick,
  onAddLead,
  showOwner = false,
  emptyMessage = "No leads found",
  emptySubMessage = "Click 'Add New Lead' to create your first lead",
  title = "Leads",
}) => {
  // Utility functions
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
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (leads.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          {emptyMessage}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {emptySubMessage}
        </Typography>
        {onAddLead && (
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onAddLead}
          >
            Add New Lead
          </Button>
        )}
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title} ({leads.length})
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lead Info</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              {showOwner && <TableCell>Assigned To</TableCell>}
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead) => (
              <LeadTableRow
                key={lead.id}
                lead={lead}
                onMenuClick={onMenuClick}
                showOwner={showOwner}
                getPriorityColor={getPriorityColor}
                getStatusColor={getStatusColor}
                formatDate={formatDate}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LeadsTable;
