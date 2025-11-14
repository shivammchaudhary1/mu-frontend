import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
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
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  Analytics as AnalyticsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
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
import { setLogout } from "../../redux/slices/authSlice";
import theme from "../../styles/theme";

const Sales = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const myLeads = useSelector(selectMyLeads);
  const loading = useSelector(selectLeadsLoading);
  const error = useSelector(selectLeadsError);
  const success = useSelector(selectLeadsSuccess);

  // Layout states
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");

  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  const drawerWidth = 280;

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

  // Navigation handlers
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  const handleNavigation = (view) => {
    setActiveView(view);
    setMobileOpen(false); // Close mobile drawer after selection
  };

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

  // Sidebar navigation items
  const navigationItems = [
    {
      text: "Dashboard",
      icon: <HomeIcon />,
      view: "dashboard",
    },
    // {
    //   text: "My Leads",
    //   icon: <AssignmentIcon />,
    //   view: "myLeads",
    // },
    {
      text: "Performance",
      icon: <AnalyticsIcon />,
      view: "performance",
    },
  ];

  // Sidebar component
  const drawer = (
    <div>
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Typography variant="h6" component="div">
          Sales Portal
        </Typography>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.view} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.view)}
              selected={activeView === item.view}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                  },
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.primary.contrastText,
                  },
                },
                "&:hover": {
                  backgroundColor: theme.palette.grey[100],
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    activeView === item.view
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.secondary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      {/* Top App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: theme.shadows[1],
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div">
              Welcome back, {user?.username || user?.name || "Sales Executive"}!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your leads and track performance
            </Typography>
          </Box>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.error.light,
                color: theme.palette.error.contrastText,
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar /> {/* This pushes content below the app bar */}
        {/* Add Lead Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            size="large"
            sx={{
              borderRadius: theme.shape.borderRadius,
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Add New Lead
          </Button>
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
        {/* Dashboard Content */}
        {(activeView === "dashboard" || activeView === "myLeads") && (
          <>
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
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
                          {stats.total}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <AssignmentIcon />
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
                          New Leads
                        </Typography>
                        <Typography
                          variant="h4"
                          component="p"
                          sx={{ color: theme.palette.info.main }}
                        >
                          {stats.newLeads}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                        <PersonIcon />
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
                          Qualified
                        </Typography>
                        <Typography
                          variant="h4"
                          component="p"
                          sx={{ color: theme.palette.success.main }}
                        >
                          {stats.qualified}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                        <BusinessIcon />
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
                          Won
                        </Typography>
                        <Typography
                          variant="h4"
                          component="p"
                          sx={{ color: theme.palette.success.main }}
                        >
                          {stats.won}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                        <AnalyticsIcon />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Leads Table */}
            <Card elevation={2}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: theme.palette.primary.main }}
                >
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
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
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
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                                  <PersonIcon />
                                </Avatar>
                                <Box>
                                  <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                  >
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
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
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
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
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
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
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
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
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
          </>
        )}
        {/* Performance View */}
        {activeView === "performance" && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card elevation={2}>
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Performance Analytics
                  </Typography>
                  <Divider sx={{ mb: 3 }} />

                  {/* Performance Stats */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={3}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography
                          variant="h3"
                          sx={{ color: theme.palette.success.main }}
                        >
                          {stats.total > 0
                            ? ((stats.won / stats.total) * 100).toFixed(1)
                            : 0}
                          %
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Win Rate
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography
                          variant="h3"
                          sx={{ color: theme.palette.primary.main }}
                        >
                          {stats.total}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Total Leads
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography
                          variant="h3"
                          sx={{ color: theme.palette.info.main }}
                        >
                          {stats.qualified}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Qualified Leads
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography
                          variant="h3"
                          sx={{ color: theme.palette.success.main }}
                        >
                          {stats.won}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Won Deals
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textAlign: "center", py: 4 }}
                  >
                    Detailed performance metrics and charts coming soon...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
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
    </Box>
  );
};

export default Sales;
