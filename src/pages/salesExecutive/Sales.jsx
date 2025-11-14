import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import CreateLeadForm from "../../component/leads/CreateLeadForm";
import LeadsTable from "../../component/leads/LeadsTable";
import LeadActionMenu from "../../component/leads/LeadActionMenu";
import EditLeadModal from "../../modals/EditLeadModal";
import ViewLeadModal from "../../modals/ViewLeadModal";
import DeleteConfirmModal from "../../modals/DeleteConfirmModal";
import {
  fetchMyLeads,
  updateLead,
  updateLeadStatus,
  updateLeadPriority,
  deleteLead,
  clearError,
  clearSuccess,
  selectMyLeads,
  selectLeadsLoading,
  selectLeadsError,
  selectLeadsSuccess,
} from "../../redux/slices/leadSlice";
import { selectUser } from "../../redux/slices/authSlice";

const Sales = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const myLeads = useSelector(selectMyLeads);
  const loading = useSelector(selectLeadsLoading);
  const error = useSelector(selectLeadsError);
  const success = useSelector(selectLeadsSuccess);

  // Modal states
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Menu and selected lead states
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  // Load user's leads on component mount
  useEffect(() => {
    dispatch(fetchMyLeads());
  }, [dispatch]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => dispatch(clearSuccess()), 5000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Dialog handlers
  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog = () => setOpenCreateDialog(false);

  const handleLeadCreated = (newLead) => {
    console.log("New lead created:", newLead);
    handleCloseCreateDialog();
    dispatch(fetchMyLeads());
  };

  // Menu handlers
  const handleMenuClick = (event, lead) => {
    setAnchorEl(event.currentTarget);
    setSelectedLead(lead);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLead(null);
  };

  // CRUD Action handlers
  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setOpenViewModal(true);
  };

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setOpenEditModal(true);
  };

  const handleDeleteLead = (lead) => {
    setSelectedLead(lead);
    setOpenDeleteModal(true);
  };

  const handleUpdateLead = (leadId, updateData) => {
    dispatch(updateLead({ leadId, updateData }))
      .unwrap()
      .then(() => {
        setOpenEditModal(false);
        dispatch(fetchMyLeads());
      })
      .catch((error) => {
        console.error("Error updating lead:", error);
      });
  };

  const handleConfirmDelete = () => {
    if (selectedLead) {
      dispatch(deleteLead(selectedLead.id))
        .unwrap()
        .then(() => {
          setOpenDeleteModal(false);
          setSelectedLead(null);
          dispatch(fetchMyLeads());
        })
        .catch((error) => {
          console.error("Error deleting lead:", error);
        });
    }
  };

  const handleStatusUpdate = (leadId, status) => {
    dispatch(updateLeadStatus({ leadId, status }))
      .unwrap()
      .then(() => {
        dispatch(fetchMyLeads());
      });
  };

  const handlePriorityUpdate = (leadId, priority) => {
    dispatch(updateLeadPriority({ leadId, priority }))
      .unwrap()
      .then(() => {
        dispatch(fetchMyLeads());
      });
  };

  // Statistics calculation
  const getLeadStats = () => {
    const total = myLeads.length;
    const newLeads = myLeads.filter((lead) => lead.status === "New").length;
    const qualified = myLeads.filter(
      (lead) => lead.status === "Qualified"
    ).length;
    const won = myLeads.filter((lead) => lead.status === "Won").length;

    return { total, newLeads, qualified, won };
  };

  const stats = getLeadStats();

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            My Leads Dashboard
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateDialog}
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
              px: 3,
              py: 1.5,
            }}
          >
            Add New Lead
          </Button>
        </Box>

        {/* Welcome Message */}
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Welcome back, {user?.name}! Here are your assigned leads.
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Leads
                </Typography>
                <Typography variant="h4" component="div">
                  {stats.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  New Leads
                </Typography>
                <Typography variant="h4" component="div" color="primary">
                  {stats.newLeads}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Qualified
                </Typography>
                <Typography variant="h4" component="div" color="success.main">
                  {stats.qualified}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Won
                </Typography>
                <Typography variant="h4" component="div" color="success.main">
                  {stats.won}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Messages */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => dispatch(clearError())}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
          onClose={() => dispatch(clearSuccess())}
        >
          {success}
        </Alert>
      )}

      {/* Leads Table */}
      <Card>
        <CardContent>
          <LeadsTable
            leads={myLeads}
            loading={loading}
            onMenuClick={handleMenuClick}
            onAddLead={handleOpenCreateDialog}
            title="My Leads"
            emptyMessage="No leads assigned to you yet"
            emptySubMessage="Click 'Add New Lead' to create your first lead"
          />
        </CardContent>
      </Card>

      {/* Action Menu */}
      <LeadActionMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        lead={selectedLead}
        onView={handleViewLead}
        onEdit={handleEditLead}
        onDelete={handleDeleteLead}
        onStatusUpdate={handleStatusUpdate}
        onPriorityUpdate={handlePriorityUpdate}
        canDelete={false}
      />

      {/* Create Lead Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            minHeight: "80vh",
          },
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
            Create New Lead
          </Typography>
          <IconButton onClick={handleCloseCreateDialog} size="large">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <CreateLeadForm
            onSubmit={handleLeadCreated}
            onCancel={handleCloseCreateDialog}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Lead Modal */}
      <EditLeadModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        lead={selectedLead}
        onSave={handleUpdateLead}
        loading={loading}
        error={error}
      />

      {/* View Lead Modal */}
      <ViewLeadModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        lead={selectedLead}
        onEdit={handleEditLead}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
        title="Delete Lead"
        itemName={selectedLead?.leadname}
        message={`Are you sure you want to delete the lead "${selectedLead?.leadname}"?`}
      />
    </Box>
  );
};

export default Sales;
