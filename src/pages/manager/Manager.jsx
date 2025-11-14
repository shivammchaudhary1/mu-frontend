import React, { useState, useEffect, useMemo } from "react";
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
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  TrendingUp,
  People,
  Assignment,
  CheckCircle,
  Home as HomeIcon,
  Group as GroupIcon,
  Analytics as AnalyticsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllLeads, deleteLead } from "../../redux/slices/leadSlice";
import { fetchSalesExecutives } from "../../redux/slices/userSlice";
import { showToast } from "../../redux/slices/toastSlice";
import { setLogout } from "../../redux/slices/authSlice";
import ManagerCreateLeadModal from "../../component/ManagerCreateLeadModal";
import ManagerEditLeadModal from "../../component/ManagerEditLeadModal";
import ViewLeadModal from "../../modals/ViewLeadModal";
import DeleteConfirmModal from "../../modals/DeleteConfirmModal";
import ManagerLeadsTable from "../../component/ManagerLeadsTable";
import theme from "../../styles/theme";

const Manager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leads, loading } = useSelector((state) => state.leads);
  const { salesExecutives } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  // Layout states
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");

  // Memoized filtered leads to avoid useEffect issues
  const filteredLeads = useMemo(() => {
    if (!searchTerm.trim()) {
      return leads;
    }
    return leads.filter(
      (lead) =>
        lead.leadname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.mobile?.includes(searchTerm)
    );
  }, [leads, searchTerm]);

  const drawerWidth = 280;

  useEffect(() => {
    // Fetch all leads (manager can see all leads)
    dispatch(fetchAllLeads());
    dispatch(fetchSalesExecutives());
  }, [dispatch]);

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

  // Sidebar navigation items
  const navigationItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      view: "dashboard",
    },
    {
      text: "Sales Executive List",
      icon: <GroupIcon />,
      view: "salesExecutives",
    },
    {
      text: "Sales Information",
      icon: <AnalyticsIcon />,
      view: "salesInfo",
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
          Manager Portal
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
              Welcome back, {user?.username || "Manager"}!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage all leads and sales activities
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
            onClick={handleCreateClick}
            size="large"
            sx={{
              borderRadius: theme.shape.borderRadius,
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Add Lead
          </Button>
        </Box>
        {/* Dashboard Content */}
        {activeView === "dashboard" && (
          <>
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
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
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
                      <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
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
                      <Avatar sx={{ bgcolor: theme.palette.info.main }}>
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
                      <Avatar sx={{ bgcolor: theme.palette.success.main }}>
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
                      {Object.entries(priorityStats).map(
                        ([priority, count]) => (
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
                        )
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Search and Filter Section */}
          </>
        )}
        {/* Sales Executive List View */}
        {activeView === "salesExecutives" && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card elevation={2}>
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Sales Executive Team
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Manage and view all sales executives and their performance
                    metrics
                  </Typography>
                  <Divider sx={{ mb: 3 }} />

                  {/* Sales Executive Table */}
                  <TableContainer component={Paper} elevation={1}>
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label="sales executives table"
                    >
                      <TableHead>
                        <TableRow
                          sx={{ backgroundColor: theme.palette.primary.main }}
                        >
                          <TableCell
                            sx={{
                              color: theme.palette.primary.contrastText,
                              fontWeight: "bold",
                            }}
                          >
                            Profile
                          </TableCell>
                          <TableCell
                            sx={{
                              color: theme.palette.primary.contrastText,
                              fontWeight: "bold",
                            }}
                          >
                            Name
                          </TableCell>
                          <TableCell
                            sx={{
                              color: theme.palette.primary.contrastText,
                              fontWeight: "bold",
                            }}
                          >
                            Email
                          </TableCell>
                          <TableCell
                            sx={{
                              color: theme.palette.primary.contrastText,
                              fontWeight: "bold",
                            }}
                          >
                            Role
                          </TableCell>
                          <TableCell
                            sx={{
                              color: theme.palette.primary.contrastText,
                              fontWeight: "bold",
                            }}
                            align="center"
                          >
                            Assigned Leads
                          </TableCell>
                          <TableCell
                            sx={{
                              color: theme.palette.primary.contrastText,
                              fontWeight: "bold",
                            }}
                            align="center"
                          >
                            Workload Status
                          </TableCell>
                          <TableCell
                            sx={{
                              color: theme.palette.primary.contrastText,
                              fontWeight: "bold",
                            }}
                            align="center"
                          >
                            Performance
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {assignmentStats.map((exec) => (
                          <TableRow
                            key={exec.id}
                            sx={{
                              "&:nth-of-type(odd)": {
                                backgroundColor: theme.palette.grey[50],
                              },
                              "&:hover": {
                                backgroundColor:
                                  theme.palette.primary.light + "20",
                                cursor: "pointer",
                              },
                              transition: "background-color 0.2s ease",
                            }}
                          >
                            <TableCell>
                              <Avatar
                                sx={{
                                  width: 48,
                                  height: 48,
                                  bgcolor: theme.palette.primary.main,
                                  fontSize: "1.2rem",
                                  fontWeight: "bold",
                                }}
                              >
                                {(exec.username || exec.name || "SE")
                                  .charAt(0)
                                  .toUpperCase()}
                              </Avatar>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {exec.username ||
                                  exec.name ||
                                  `User ${exec.id}`}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                ID: #{exec.id}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {exec.email || "Not available"}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={exec.role || "Sales Executive"}
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ textTransform: "capitalize" }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Badge
                                badgeContent={exec.assignedLeads}
                                color={
                                  exec.assignedLeads > 10
                                    ? "error"
                                    : exec.assignedLeads > 5
                                    ? "warning"
                                    : "success"
                                }
                                sx={{
                                  "& .MuiBadge-badge": {
                                    fontSize: "0.75rem",
                                    height: 20,
                                    minWidth: 20,
                                  },
                                }}
                              >
                                <Assignment
                                  sx={{ color: theme.palette.grey[600] }}
                                />
                              </Badge>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                              >
                                {exec.assignedLeads} leads
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={
                                  exec.assignedLeads > 10
                                    ? "High Load"
                                    : exec.assignedLeads > 5
                                    ? "Medium Load"
                                    : "Low Load"
                                }
                                size="small"
                                color={
                                  exec.assignedLeads > 10
                                    ? "error"
                                    : exec.assignedLeads > 5
                                    ? "warning"
                                    : "success"
                                }
                                sx={{ fontWeight: 500 }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color:
                                      exec.assignedLeads > 0
                                        ? theme.palette.success.main
                                        : theme.palette.grey[500],
                                    fontWeight: 600,
                                  }}
                                >
                                  {exec.assignedLeads > 0
                                    ? "Active"
                                    : "Inactive"}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {exec.assignedLeads > 0
                                    ? "Managing leads"
                                    : "No active leads"}
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                        {assignmentStats.length === 0 && (
                          <TableRow>
                            <TableCell
                              colSpan={7}
                              align="center"
                              sx={{ py: 6 }}
                            >
                              <Typography variant="h6" color="text.secondary">
                                No Sales Executives Found
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                              >
                                Add sales executives to your team to start
                                managing leads effectively
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Summary Statistics */}
                  {assignmentStats.length > 0 && (
                    <Box
                      sx={{
                        mt: 3,
                        p: 2,
                        backgroundColor: theme.palette.grey[50],
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Team Summary
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                          <Box sx={{ textAlign: "center" }}>
                            <Typography
                              variant="h4"
                              sx={{ color: theme.palette.primary.main }}
                            >
                              {assignmentStats.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Total Executives
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Box sx={{ textAlign: "center" }}>
                            <Typography
                              variant="h4"
                              sx={{ color: theme.palette.success.main }}
                            >
                              {
                                assignmentStats.filter(
                                  (exec) => exec.assignedLeads > 0
                                ).length
                              }
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Active Executives
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Box sx={{ textAlign: "center" }}>
                            <Typography
                              variant="h4"
                              sx={{ color: theme.palette.warning.main }}
                            >
                              {Math.round(
                                assignmentStats.reduce(
                                  (acc, exec) => acc + exec.assignedLeads,
                                  0
                                ) / assignmentStats.length
                              ) || 0}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Avg. Leads per Executive
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Box sx={{ textAlign: "center" }}>
                            <Typography
                              variant="h4"
                              sx={{ color: theme.palette.error.main }}
                            >
                              {
                                assignmentStats.filter(
                                  (exec) => exec.assignedLeads > 10
                                ).length
                              }
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Overloaded Executives
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        {/* Sales Information View */}
        {activeView === "salesInfo" && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card elevation={2}>
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Sales Analytics & Information
                  </Typography>
                  <Divider sx={{ mb: 3 }} />

                  {/* Overall Statistics */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography
                          variant="h3"
                          sx={{ color: theme.palette.success.main }}
                        >
                          {conversionRate}%
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Overall Conversion Rate
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography
                          variant="h3"
                          sx={{ color: theme.palette.primary.main }}
                        >
                          {totalLeads}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Total Leads Managed
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography
                          variant="h3"
                          sx={{ color: theme.palette.info.main }}
                        >
                          {Math.round((assignedLeads / totalLeads) * 100) || 0}%
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Assignment Rate
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Sales Executive Performance */}
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Sales Executive Assignment Overview
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    {assignmentStats.map((exec) => (
                      <Card
                        key={exec.id}
                        variant="outlined"
                        sx={{ minWidth: 200 }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                fontSize: "0.875rem",
                              }}
                            >
                              {(exec.username || exec.name || "SE")
                                .charAt(0)
                                .toUpperCase()}
                            </Avatar>
                            <Typography variant="subtitle1">
                              {exec.username || exec.name || `User ${exec.id}`}
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 2 }}>
                            <Typography
                              variant="h4"
                              sx={{ color: theme.palette.secondary.main }}
                            >
                              {exec.assignedLeads}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Active Leads
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>

                  <Box>
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
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
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
      </Box>
    </Box>
  );
};

export default Manager;
