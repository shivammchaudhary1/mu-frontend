import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
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
  Paper,
  Chip,
  TextField,
  InputAdornment,
  Button,
  TablePagination,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Home as HomeIcon,
  Group as GroupIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  TrendingUp,
  Business,
  Assignment,
  CheckCircle,
  Cancel,
  Pending,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import {
  fetchDashboardStats,
  fetchManagers,
  fetchSalesExecutives,
  fetchSalesRecords,
  fetchAuditLogs,
  clearError,
  selectDashboardStats,
  selectManagers,
  selectSalesExecutives,
  selectSalesRecords,
  selectAuditLogs,
  selectPagination,
  selectLoading,
  selectError,
} from "../../redux/slices/adminSlice";
import { setLogout } from "../../redux/slices/authSlice";
import { selectUser } from "../../redux/slices/authSlice";
import theme from "../../styles/theme";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const user = useSelector(selectUser);
  const dashboardStats = useSelector(selectDashboardStats);
  const managers = useSelector(selectManagers);
  const salesExecutives = useSelector(selectSalesExecutives);
  const salesRecords = useSelector(selectSalesRecords);
  const auditLogs = useSelector(selectAuditLogs);
  const pagination = useSelector(selectPagination);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Local state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [searchTerms, setSearchTerms] = useState({
    managers: "",
    salesExecutives: "",
    salesRecords: "",
    auditLogs: "",
  });
  const [filters, setFilters] = useState({
    salesRecords: { status: "" },
    auditLogs: { action: "" },
  });

  const drawerWidth = 280;

  // Fetch initial data
  useEffect(() => {
    if (activeView === "dashboard") {
      dispatch(fetchDashboardStats());
    }
  }, [dispatch, activeView]);

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
    setMobileOpen(false);

    // Fetch data based on view
    switch (view) {
      case "dashboard":
        dispatch(fetchDashboardStats());
        break;
      case "managers":
        dispatch(
          fetchManagers({ page: 1, limit: 10, search: searchTerms.managers })
        );
        break;
      case "salesExecutives":
        dispatch(
          fetchSalesExecutives({
            page: 1,
            limit: 10,
            search: searchTerms.salesExecutives,
          })
        );
        break;
      case "sales":
        dispatch(
          fetchSalesRecords({
            page: 1,
            limit: 10,
            search: searchTerms.salesRecords,
            status: filters.salesRecords.status,
          })
        );
        break;
      case "history":
        dispatch(
          fetchAuditLogs({
            page: 1,
            limit: 10,
            search: searchTerms.auditLogs,
            action: filters.auditLogs.action,
          })
        );
        break;
      default:
        break;
    }
  };

  // Search handlers
  const handleSearch = (viewType, searchTerm) => {
    setSearchTerms((prev) => ({ ...prev, [viewType]: searchTerm }));

    switch (viewType) {
      case "managers":
        dispatch(fetchManagers({ page: 1, limit: 10, search: searchTerm }));
        break;
      case "salesExecutives":
        dispatch(
          fetchSalesExecutives({ page: 1, limit: 10, search: searchTerm })
        );
        break;
      case "salesRecords":
        dispatch(
          fetchSalesRecords({
            page: 1,
            limit: 10,
            search: searchTerm,
            status: filters.salesRecords.status,
          })
        );
        break;
      case "auditLogs":
        dispatch(
          fetchAuditLogs({
            page: 1,
            limit: 10,
            search: searchTerm,
            action: filters.auditLogs.action,
          })
        );
        break;
      default:
        break;
    }
  };

  // Filter handlers
  const handleFilterChange = (viewType, filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [viewType]: { ...prev[viewType], [filterType]: value },
    }));

    if (viewType === "salesRecords") {
      dispatch(
        fetchSalesRecords({
          page: 1,
          limit: 10,
          search: searchTerms.salesRecords,
          status: value,
        })
      );
    } else if (viewType === "auditLogs") {
      dispatch(
        fetchAuditLogs({
          page: 1,
          limit: 10,
          search: searchTerms.auditLogs,
          action: value,
        })
      );
    }
  };

  // Pagination handlers
  const handlePageChange = (viewType, newPage) => {
    const page = newPage + 1; // Material-UI uses 0-based pagination, our API uses 1-based

    switch (viewType) {
      case "managers":
        dispatch(
          fetchManagers({ page, limit: 10, search: searchTerms.managers })
        );
        break;
      case "salesExecutives":
        dispatch(
          fetchSalesExecutives({
            page,
            limit: 10,
            search: searchTerms.salesExecutives,
          })
        );
        break;
      case "salesRecords":
        dispatch(
          fetchSalesRecords({
            page,
            limit: 10,
            search: searchTerms.salesRecords,
            status: filters.salesRecords.status,
          })
        );
        break;
      case "auditLogs":
        dispatch(
          fetchAuditLogs({
            page,
            limit: 10,
            search: searchTerms.auditLogs,
            action: filters.auditLogs.action,
          })
        );
        break;
      default:
        break;
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Sidebar navigation items
  const navigationItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      view: "dashboard",
    },
    {
      text: "Managers",
      icon: <GroupIcon />,
      view: "managers",
    },
    {
      text: "Sales Executives",
      icon: <PeopleIcon />,
      view: "salesExecutives",
    },
    {
      text: "Sales",
      icon: <AssessmentIcon />,
      view: "sales",
    },
    {
      text: "History",
      icon: <HistoryIcon />,
      view: "history",
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
          Admin Portal
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
              Welcome back, {user?.username || user?.name || "Admin"}!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your organization and monitor performance
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
            keepMounted: true,
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
        <Toolbar />

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            onClose={() => dispatch(clearError())}
          >
            {error}
          </Alert>
        )}

        {/* Dashboard View */}
        {activeView === "dashboard" && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ color: theme.palette.primary.main }}
              >
                Dashboard Overview
              </Typography>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => dispatch(fetchDashboardStats())}
                disabled={loading.dashboard}
              >
                Refresh
              </Button>
            </Box>

            {loading.dashboard ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              dashboardStats && (
                <>
                  {/* Summary Cards */}
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={2}>
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
                              <Typography
                                color="text.secondary"
                                variant="body2"
                              >
                                Total Managers
                              </Typography>
                              <Typography variant="h4" component="p">
                                {dashboardStats.summary.totalManagers}
                              </Typography>
                            </Box>
                            <Avatar
                              sx={{ bgcolor: theme.palette.primary.main }}
                            >
                              <GroupIcon />
                            </Avatar>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
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
                              <Typography
                                color="text.secondary"
                                variant="body2"
                              >
                                Sales Executives
                              </Typography>
                              <Typography variant="h4" component="p">
                                {dashboardStats.summary.totalSalesExecutives}
                              </Typography>
                            </Box>
                            <Avatar
                              sx={{ bgcolor: theme.palette.secondary.main }}
                            >
                              <PeopleIcon />
                            </Avatar>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
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
                              <Typography
                                color="text.secondary"
                                variant="body2"
                              >
                                Total Leads
                              </Typography>
                              <Typography variant="h4" component="p">
                                {dashboardStats.summary.totalLeads}
                              </Typography>
                            </Box>
                            <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                              <Assignment />
                            </Avatar>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
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
                              <Typography
                                color="text.secondary"
                                variant="body2"
                              >
                                Won Leads
                              </Typography>
                              <Typography variant="h4" component="p">
                                {dashboardStats.summary.wonLeads}
                              </Typography>
                            </Box>
                            <Avatar
                              sx={{ bgcolor: theme.palette.success.main }}
                            >
                              <CheckCircle />
                            </Avatar>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
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
                              <Typography
                                color="text.secondary"
                                variant="body2"
                              >
                                Lost Leads
                              </Typography>
                              <Typography variant="h4" component="p">
                                {dashboardStats.summary.lostLeads}
                              </Typography>
                            </Box>
                            <Avatar sx={{ bgcolor: theme.palette.error.main }}>
                              <Cancel />
                            </Avatar>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
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
                              <Typography
                                color="text.secondary"
                                variant="body2"
                              >
                                Pending
                              </Typography>
                              <Typography variant="h4" component="p">
                                {dashboardStats.summary.pendingLeads}
                              </Typography>
                            </Box>
                            <Avatar
                              sx={{ bgcolor: theme.palette.warning.main }}
                            >
                              <Pending />
                            </Avatar>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  {/* Charts Section */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Card elevation={2}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Leads Over Time (Last 30 Days)
                          </Typography>
                          <Box
                            sx={{
                              height: 300,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {dashboardStats.charts.leadsOverTime.length > 0 ? (
                              <Typography>
                                Chart will be implemented with charting library
                              </Typography>
                            ) : (
                              <Typography color="text.secondary">
                                No data available for the last 30 days
                              </Typography>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card elevation={2}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Lead Status Distribution
                          </Typography>
                          <Box sx={{ height: 300 }}>
                            {dashboardStats.charts.leadStatusDistribution.map(
                              (item, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      mb: 1,
                                    }}
                                  >
                                    <Typography variant="body2">
                                      {item.status}
                                    </Typography>
                                    <Typography variant="body2">
                                      {item.count} ({item.percentage}%)
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      height: 8,
                                      backgroundColor: theme.palette.grey[200],
                                      borderRadius: 4,
                                      overflow: "hidden",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: `${item.percentage}%`,
                                        height: "100%",
                                        backgroundColor:
                                          theme.palette.primary.main,
                                      }}
                                    />
                                  </Box>
                                </Box>
                              )
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </>
              )
            )}
          </>
        )}

        {/* Managers View */}
        {activeView === "managers" && (
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: theme.palette.primary.main, mb: 3 }}
            >
              Managers
            </Typography>

            {/* Search */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search managers by name or email..."
                value={searchTerms.managers}
                onChange={(e) => handleSearch("managers", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Managers Table */}
            <TableContainer component={Paper}>
              <Table>
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
                      ID
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
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      Created At
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading.managers ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : managers.length > 0 ? (
                    managers.map((manager) => (
                      <TableRow key={manager.id} hover>
                        <TableCell>{manager.id}</TableCell>
                        <TableCell>{manager.name}</TableCell>
                        <TableCell>{manager.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={manager.status}
                            color={
                              manager.status === "active" ? "success" : "error"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{formatDate(manager.created_at)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No managers found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              component="div"
              count={pagination.managers.total}
              page={pagination.managers.page - 1}
              onPageChange={(_, newPage) =>
                handlePageChange("managers", newPage)
              }
              rowsPerPage={pagination.managers.limit}
              rowsPerPageOptions={[10]}
            />
          </Box>
        )}

        {/* Sales Executives View */}
        {activeView === "salesExecutives" && (
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: theme.palette.primary.main, mb: 3 }}
            >
              Sales Executives
            </Typography>

            {/* Search */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search sales executives by name or email..."
                value={searchTerms.salesExecutives}
                onChange={(e) =>
                  handleSearch("salesExecutives", e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Sales Executives Table */}
            <TableContainer component={Paper}>
              <Table>
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
                      ID
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
                      Assigned Leads
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      Created At
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading.salesExecutives ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : salesExecutives.length > 0 ? (
                    salesExecutives.map((executive) => (
                      <TableRow key={executive.id} hover>
                        <TableCell>{executive.id}</TableCell>
                        <TableCell>{executive.name}</TableCell>
                        <TableCell>{executive.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={executive.assigned_leads}
                            color="primary"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={executive.status}
                            color={
                              executive.status === "active"
                                ? "success"
                                : "error"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {formatDate(executive.created_at)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No sales executives found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              component="div"
              count={pagination.salesExecutives.total}
              page={pagination.salesExecutives.page - 1}
              onPageChange={(_, newPage) =>
                handlePageChange("salesExecutives", newPage)
              }
              rowsPerPage={pagination.salesExecutives.limit}
              rowsPerPageOptions={[10]}
            />
          </Box>
        )}

        {/* Sales Records View */}
        {activeView === "sales" && (
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: theme.palette.primary.main, mb: 3 }}
            >
              Sales Records
            </Typography>

            {/* Search and Filter */}
            <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
              <TextField
                variant="outlined"
                placeholder="Search by lead name, company, or email..."
                value={searchTerms.salesRecords}
                onChange={(e) => handleSearch("salesRecords", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ flexGrow: 1 }}
              />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.salesRecords.status}
                  label="Status"
                  onChange={(e) =>
                    handleFilterChange("salesRecords", "status", e.target.value)
                  }
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Contacted">Contacted</MenuItem>
                  <MenuItem value="Qualified">Qualified</MenuItem>
                  <MenuItem value="Proposal">Proposal</MenuItem>
                  <MenuItem value="Negotiation">Negotiation</MenuItem>
                  <MenuItem value="Won">Won</MenuItem>
                  <MenuItem value="Lost">Lost</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Sales Records Table */}
            <TableContainer component={Paper}>
              <Table>
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
                      ID
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      Lead Name
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      Company
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
                      Owner
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      Priority
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      Created At
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading.salesRecords ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : salesRecords.length > 0 ? (
                    salesRecords.map((record) => (
                      <TableRow key={record.id} hover>
                        <TableCell>{record.id}</TableCell>
                        <TableCell>{record.leadname}</TableCell>
                        <TableCell>{record.company || "N/A"}</TableCell>
                        <TableCell>{record.email || "N/A"}</TableCell>
                        <TableCell>{record.owner_name}</TableCell>
                        <TableCell>
                          <Chip
                            label={record.status}
                            color={
                              record.status === "Won"
                                ? "success"
                                : record.status === "Lost"
                                ? "error"
                                : record.status === "Qualified"
                                ? "info"
                                : "default"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={record.priority}
                            color={
                              record.priority === "High"
                                ? "error"
                                : record.priority === "Medium"
                                ? "warning"
                                : "success"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{formatDate(record.created_at)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No sales records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              component="div"
              count={pagination.salesRecords.total}
              page={pagination.salesRecords.page - 1}
              onPageChange={(_, newPage) =>
                handlePageChange("salesRecords", newPage)
              }
              rowsPerPage={pagination.salesRecords.limit}
              rowsPerPageOptions={[10]}
            />
          </Box>
        )}

        {/* History/Audit Logs View */}
        {activeView === "history" && (
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: theme.palette.primary.main, mb: 3 }}
            >
              Audit History
            </Typography>

            {/* Search and Filter */}
            <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
              <TextField
                variant="outlined"
                placeholder="Search by action or user name..."
                value={searchTerms.auditLogs}
                onChange={(e) => handleSearch("auditLogs", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ flexGrow: 1 }}
              />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Action</InputLabel>
                <Select
                  value={filters.auditLogs.action}
                  label="Action"
                  onChange={(e) =>
                    handleFilterChange("auditLogs", "action", e.target.value)
                  }
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="CREATE">Create</MenuItem>
                  <MenuItem value="UPDATE">Update</MenuItem>
                  <MenuItem value="DELETE">Delete</MenuItem>
                  <MenuItem value="LOGIN">Login</MenuItem>
                  <MenuItem value="LOGOUT">Logout</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Audit Logs Table */}
            <TableContainer component={Paper}>
              <Table>
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
                      ID
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      User
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      Action
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      Entity
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      Entity ID
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading.auditLogs ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : auditLogs.length > 0 ? (
                    auditLogs.map((log) => (
                      <TableRow key={log.id} hover>
                        <TableCell>{log.id}</TableCell>
                        <TableCell>{log.user_name || "System"}</TableCell>
                        <TableCell>
                          <Chip
                            label={log.action}
                            color={
                              log.action === "CREATE"
                                ? "success"
                                : log.action === "UPDATE"
                                ? "info"
                                : log.action === "DELETE"
                                ? "error"
                                : "default"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{log.entity_type}</TableCell>
                        <TableCell>{log.entity_id || "N/A"}</TableCell>
                        <TableCell>{formatDate(log.created_at)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No audit logs found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              component="div"
              count={pagination.auditLogs.total}
              page={pagination.auditLogs.page - 1}
              onPageChange={(_, newPage) =>
                handlePageChange("auditLogs", newPage)
              }
              rowsPerPage={pagination.auditLogs.limit}
              rowsPerPageOptions={[10]}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Admin;
