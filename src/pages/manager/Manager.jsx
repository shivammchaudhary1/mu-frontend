import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  TextField,
  InputAdornment,
  Fab,
  Chip,
  Avatar,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  TrendingUp,
  People,
  Assignment,
  CheckCircle,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLeads, deleteLead } from "../../redux/slices/leadSlice";
import { fetchSalesExecutives } from "../../redux/slices/userSlice";
import { showToast } from "../../redux/slices/toastSlice";
import ManagerCreateLeadModal from "../../component/ManagerCreateLeadModal";
import ManagerEditLeadModal from "../../component/ManagerEditLeadModal";
import ViewLeadModal from "../../modals/ViewLeadModal";
import DeleteConfirmModal from "../../modals/DeleteConfirmModal";
import ManagerLeadsTable from "../../component/ManagerLeadsTable";

const Manager = () => {
  const dispatch = useDispatch();
  const { leads, loading, error, stats } = useSelector((state) => state.leads);
  const { salesExecutives } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    // Fetch all leads (manager can see all leads)
    dispatch(fetchAllLeads());
    dispatch(fetchSalesExecutives());
  }, [dispatch]);

  useEffect(() => {
    // Filter leads based on search term
    if (!searchTerm.trim()) {
      setFilteredLeads(leads);
    } else {
      const filtered = leads.filter(
        (lead) =>
          lead.leadname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.mobile?.includes(searchTerm)
      );
      setFilteredLeads(filtered);
    }
  }, [leads, searchTerm]);

  // Modal handlers
  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleEditClick = (lead) => {
    setSelectedLead(lead);
    setEditModalOpen(true);
  };

  const handleViewClick = (lead) => {
    setSelectedLead(lead);
    setViewModalOpen(true);
  };

  const handleDeleteClick = (lead) => {
    setSelectedLead(lead);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedLead) {
      try {
        await dispatch(deleteLead(selectedLead.id)).unwrap();
        dispatch(
          showToast({ message: "Lead deleted successfully!", type: "success" })
        );
        setDeleteModalOpen(false);
        setSelectedLead(null);
      } catch (error) {
        dispatch(
          showToast({
            message: error || "Failed to delete lead",
            type: "error",
          })
        );
      }
    }
  };

  const handleCloseModals = () => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setViewModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedLead(null);
    // Refresh leads after modal actions
    dispatch(fetchAllLeads());
  };

  // Calculate statistics
  const totalLeads = leads.length;
  const totalSalesExecutives = salesExecutives.length;
  const assignedLeads = leads.filter((lead) => lead.owner_id).length;
  const convertedLeads = leads.filter(
    (lead) => lead.status === "converted"
  ).length;
  const conversionRate =
    totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0;

  // Statistics by status
  const statusStats = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  // Statistics by priority
  const priorityStats = leads.reduce((acc, lead) => {
    acc[lead.priority] = (acc[lead.priority] || 0) + 1;
    return acc;
  }, {});

  // Sales executive assignment stats
  const assignmentStats = salesExecutives.map((exec) => {
    const assignedCount = leads.filter(
      (lead) => lead.owner_id === exec.id
    ).length;
    return {
      ...exec,
      assignedLeads: assignedCount,
    };
  });

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Manager Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage all leads and assign to sales executives
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
          size="large"
          sx={{ borderRadius: 2 }}
        >
          Create Lead
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography color="text.secondary" variant="h6">
                    Total Leads
                  </Typography>
                  <Typography variant="h4" component="p">
                    {totalLeads}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography color="text.secondary" variant="h6">
                    Sales Executives
                  </Typography>
                  <Typography variant="h4" component="p">
                    {totalSalesExecutives}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <People />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography color="text.secondary" variant="h6">
                    Assigned Leads
                  </Typography>
                  <Typography variant="h4" component="p">
                    {assignedLeads}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "info.main" }}>
                  <Assignment />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography color="text.secondary" variant="h6">
                    Conversion Rate
                  </Typography>
                  <Typography variant="h4" component="p">
                    {conversionRate}%
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "success.main" }}>
                  <CheckCircle />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Statistics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Status Statistics */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Leads by Status
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {Object.entries(statusStats).map(([status, count]) => (
                  <Chip
                    key={status}
                    label={`${status}: ${count}`}
                    variant="outlined"
                    sx={{ textTransform: "capitalize" }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Priority Statistics */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Leads by Priority
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {Object.entries(priorityStats).map(([priority, count]) => (
                  <Chip
                    key={priority}
                    label={`${priority}: ${count}`}
                    color={
                      priority === "high"
                        ? "error"
                        : priority === "medium"
                        ? "warning"
                        : "info"
                    }
                    variant="outlined"
                    sx={{ textTransform: "capitalize" }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sales Executive Assignment Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Executive Assignments
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {assignmentStats.map((exec) => (
                  <Card key={exec.id} variant="outlined" sx={{ minWidth: 200 }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar
                          sx={{ width: 32, height: 32, fontSize: "0.875rem" }}
                        >
                          {(exec.username || exec.name || "SE")
                            .charAt(0)
                            .toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">
                            {exec.username || exec.name || `User ${exec.id}`}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {exec.assignedLeads} leads assigned
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter Section */}
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search leads by name, company, email, or mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Leads Table */}
      <ManagerLeadsTable
        leads={filteredLeads}
        salesExecutives={salesExecutives}
        onEdit={handleEditClick}
        onView={handleViewClick}
        onDelete={handleDeleteClick}
        loading={loading}
      />

      {/* Floating Action Button for Mobile */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: { xs: "flex", sm: "none" },
        }}
        onClick={handleCreateClick}
      >
        <AddIcon />
      </Fab>

      {/* Modals */}
      <ManagerCreateLeadModal
        open={createModalOpen}
        onClose={handleCloseModals}
      />

      <ManagerEditLeadModal
        open={editModalOpen}
        onClose={handleCloseModals}
        lead={selectedLead}
      />

      <ViewLeadModal
        open={viewModalOpen}
        onClose={handleCloseModals}
        lead={selectedLead}
        salesExecutive={salesExecutives.find(
          (exec) => exec.id === selectedLead?.owner_id
        )}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Lead"
        message={`Are you sure you want to delete the lead "${selectedLead?.leadname}"? This action cannot be undone.`}
      />
    </Container>
  );
};

export default Manager;
