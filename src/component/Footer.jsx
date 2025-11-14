import React from "react";
import { Box, Container, Typography, Grid, Link, Divider } from "@mui/material";
import {
  Business,
  Email,
  Phone,
  LocationOn,
  Copyright,
} from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "white",
        mt: "auto",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Business sx={{ mr: 1, fontSize: 32, color: "primary.main" }} />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                CRM
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: "grey.300" }}>
              Your complete customer relationship management solution.
              Streamline your sales process and grow your business.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="/login"
                sx={{
                  color: "grey.300",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Login
              </Link>
              <Link
                href="/register"
                sx={{
                  color: "grey.300",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Register
              </Link>
              <Link
                href="#"
                sx={{
                  color: "grey.300",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                About Us
              </Link>
              <Link
                href="#"
                sx={{
                  color: "grey.300",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Contact Info
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Email sx={{ mr: 1, fontSize: 20, color: "primary.main" }} />
                <Typography variant="body2" sx={{ color: "grey.300" }}>
                  support@crm.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Phone sx={{ mr: 1, fontSize: 20, color: "primary.main" }} />
                <Typography variant="body2" sx={{ color: "grey.300" }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn
                  sx={{ mr: 1, fontSize: 20, color: "primary.main" }}
                />
                <Typography variant="body2" sx={{ color: "grey.300" }}>
                  123 Business St, City, State 12345
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 3, bgcolor: "grey.700" }} />

        {/* Copyright */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Copyright sx={{ mr: 1, fontSize: 16 }} />
          <Typography variant="body2" sx={{ color: "grey.400" }}>
            {currentYear} CRM System. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
