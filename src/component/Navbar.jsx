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

          {/* Right side - Login/Register buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
