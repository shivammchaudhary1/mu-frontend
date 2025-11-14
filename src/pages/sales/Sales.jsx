import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Add as AddIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import CreateLeadForm from "../../component/leads/CreateLeadForm";
import {
  fetchMyLeads,
  updateLeadStatus,
  updateLeadPriority,
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

  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  // Priority colors
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

  // Status colors
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

  // Load user's leads on component mount
  useEffect(() => {
    dispatch(fetchMyLeads());
  }, [dispatch]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLeadCreated = (newLead) => {
    console.log("New lead created:", newLead);
    handleCloseDialog();
    // Refresh leads list
    dispatch(fetchMyLeads());
  };

  const handleMenuClick = (event, lead) => {
    setAnchorEl(event.currentTarget);
    setSelectedLead(lead);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLead(null);
  };

  const handleStatusUpdate = (leadId, newStatus) => {
    dispatch(updateLeadStatus({ leadId, status: newStatus }));
    handleMenuClose();
  };

  const handlePriorityUpdate = (leadId, newPriority) => {
    dispatch(updateLeadPriority({ leadId, priority: newPriority }));
    handleMenuClose();
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
            onClick={handleOpenDialog}
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
          <Typography variant="h6" gutterBottom>
            My Leads ({myLeads.length})
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : myLeads.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No leads assigned to you yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Click "Add New Lead" to create your first lead
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
              >
                Add Your First Lead
              </Button>
            </Box>
          ) : (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Lead Info</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myLeads.map((lead) => (
                    <TableRow key={lead.id} hover>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                            <PersonIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {lead.leadname}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
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
                          <Typography variant="body2">
                            {lead.company || "N/A"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          {lead.email && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 0.5,
                              }}
                            >
                              <EmailIcon
                                sx={{ mr: 1, color: "action.active" }}
                                fontSize="small"
                              />
                              <Typography variant="body2">
                                {lead.email}
                              </Typography>
                            </Box>
                          )}
                          {lead.mobile && (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <PhoneIcon
                                sx={{ mr: 1, color: "action.active" }}
                                fontSize="small"
                              />
                              <Typography variant="body2">
                                {lead.mobile}
                              </Typography>
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
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(lead.created_at)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="More actions">
                          <IconButton
                            onClick={(e) => handleMenuClick(e, lead)}
                            size="small"
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ViewIcon sx={{ mr: 1 }} fontSize="small" />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1 }} fontSize="small" />
          Edit Lead
        </MenuItem>

        {/* Status Update Submenu */}
        <MenuItem>
          <Typography variant="body2" color="text.secondary">
            Update Status:
          </Typography>
        </MenuItem>
        {[
          "New",
          "Contacted",
          "Qualified",
          "Proposal",
          "Negotiation",
          "Won",
          "Lost",
        ].map((status) => (
          <MenuItem
            key={status}
            onClick={() => handleStatusUpdate(selectedLead?.id, status)}
            sx={{ pl: 3 }}
            disabled={selectedLead?.status === status}
          >
            <Chip
              label={status}
              color={getStatusColor(status)}
              size="small"
              variant="outlined"
            />
          </MenuItem>
        ))}

        {/* Priority Update Submenu */}
        <MenuItem>
          <Typography variant="body2" color="text.secondary">
            Update Priority:
          </Typography>
        </MenuItem>
        {["High", "Medium", "Low"].map((priority) => (
          <MenuItem
            key={priority}
            onClick={() => handlePriorityUpdate(selectedLead?.id, priority)}
            sx={{ pl: 3 }}
            disabled={selectedLead?.priority === priority}
          >
            <Chip
              label={priority}
              color={getPriorityColor(priority)}
              size="small"
            />
          </MenuItem>
        ))}
      </Menu>

      {/* Create Lead Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
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
          <IconButton onClick={handleCloseDialog} size="large">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <CreateLeadForm
            onSubmit={handleLeadCreated}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Sales;
