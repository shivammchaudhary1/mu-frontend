import React from "react";
import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { Business, ArrowForward, Login, PersonAdd } from "@mui/icons-material";
import Layout from "../component/Layout";

const Home = () => {
  return (
    <Layout>
      <Box
        sx={{
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 6, md: 10 },
              textAlign: "center",
              bgcolor: "background.paper",
              borderRadius: 4,
              border: 1,
              borderColor: "divider",
            }}
          >
            {/* Logo */}
            <Box sx={{ mb: 4 }}>
              <Business
                sx={{
                  fontSize: 80,
                  color: "primary.main",
                  mb: 2,
                }}
              />
            </Box>

            {/* Main Heading */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 600,
                color: "text.primary",
                mb: 3,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              Customer Relationship
              <Box
                component="span"
                sx={{
                  display: "block",
                  color: "primary.main",
                  mt: 1,
                }}
              >
                Management
              </Box>
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                mb: 6,
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Streamline your business relationships and boost your sales with
              our modern, intuitive CRM platform.
            </Typography>

            {/* Action Buttons */}
            <Grid container spacing={3} justifyContent="center">
              <Grid item>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  endIcon={<PersonAdd />}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    borderRadius: 2,
                    minWidth: 180,
                  }}
                >
                  Get Started
                </Button>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="large"
                  endIcon={<Login />}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    borderRadius: 2,
                    minWidth: 180,
                  }}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>

            {/* Simple Features */}
            <Box sx={{ mt: 8, pt: 6, borderTop: 1, borderColor: "divider" }}>
              <Grid container spacing={6} justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      mb: 1,
                    }}
                  >
                    Simple Setup
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    Get started in minutes
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      mb: 1,
                    }}
                  >
                    Powerful Features
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    Everything you need
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      mb: 1,
                    }}
                  >
                    Secure Platform
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    Enterprise-grade security
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;
