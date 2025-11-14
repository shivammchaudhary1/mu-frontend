import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Business,
  Login,
  PersonAdd,
  Logout,
  AccountCircle,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
  setLogout,
} from "../redux/slices/authSlice";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
    handleMenuClose();
  };

  const handleNavigateTodashboard = () => {
    if (!user?.role) return;

    if (user?.role === "sales_executive") {
      navigate("/sales");
      handleMenuClose();
      return;
    }
    navigate(`/${user?.role?.replace("_", "")}`);
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Left side - CRM Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Business
              sx={{
                mr: 1.5,
                fontSize: 32,
                color: "primary.main",
              }}
            />
            <Typography
              variant="h4"
              component={Link}
              to="/"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                textDecoration: "none",
                letterSpacing: "-0.025em",
                "&:hover": {
                  color: "primary.main",
                  transition: "color 0.2s ease-in-out",
                },
              }}
            >
              CRM
            </Typography>
          </Box>

          {/* Right side - Auth buttons */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {isAuthenticated ? (
              <>
                {/* User info and menu */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  Welcome, {user?.name}
                </Typography>
                <Button
                  onClick={handleMenuOpen}
                  startIcon={<AccountCircle />}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "text.primary",
                    "&:hover": {
                      bgcolor: "rgba(37, 99, 235, 0.04)",
                    },
                  }}
                >
                  Account
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem
                    // onClick={() => {
                    //   navigate(`/${user?.role?.replace("_", "")}`);
                    //   handleMenuClose();
                    // }}

                    onClick={handleNavigateTodashboard}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1, fontSize: 18 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                {/* Login/Register buttons for non-authenticated users */}
                <Button
                  component={Link}
                  to="/login"
                  variant={
                    location.pathname === "/login" ? "contained" : "outlined"
                  }
                  startIcon={<Login />}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    ...(location.pathname === "/login"
                      ? {
                          bgcolor: "primary.main",
                          color: "white",
                          "&:hover": {
                            bgcolor: "primary.dark",
                          },
                        }
                      : {
                          color: "text.primary",
                          borderColor: "divider",
                          "&:hover": {
                            borderColor: "primary.main",
                            bgcolor: "rgba(37, 99, 235, 0.04)",
                          },
                        }),
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant={
                    location.pathname === "/register" ? "contained" : "outlined"
                  }
                  startIcon={<PersonAdd />}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    ...(location.pathname === "/register"
                      ? {
                          bgcolor: "primary.main",
                          color: "white",
                          "&:hover": {
                            bgcolor: "primary.dark",
                          },
                        }
                      : {
                          color: "text.primary",
                          borderColor: "divider",
                          "&:hover": {
                            borderColor: "primary.main",
                            bgcolor: "rgba(37, 99, 235, 0.04)",
                          },
                        }),
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
