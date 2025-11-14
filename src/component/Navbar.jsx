import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Business, Login, PersonAdd } from "@mui/icons-material";

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "primary.main",
        boxShadow: 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left side - CRM Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Business sx={{ mr: 1, fontSize: 28 }} />
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "white",
                textDecoration: "none",
              }}
            >
              CRM
            </Typography>
          </Box>

          {/* Right side - Login/Register buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              component={Link}
              to="/login"
              variant={
                location.pathname === "/login" ? "contained" : "outlined"
              }
              startIcon={<Login />}
              sx={{
                color:
                  location.pathname === "/login" ? "primary.main" : "white",
                borderColor: "white",
                bgcolor:
                  location.pathname === "/login" ? "white" : "transparent",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "white",
                },
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
                color:
                  location.pathname === "/register" ? "primary.main" : "white",
                borderColor: "white",
                bgcolor:
                  location.pathname === "/register" ? "white" : "transparent",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "white",
                },
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
