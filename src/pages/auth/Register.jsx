import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import AuthForm from "../../component/AuthForm";
import Layout from "../../component/Layout";

const Register = () => {
  const handleRegister = async (registerData) => {
    console.log("Register Data:", registerData);

    // Here you would typically make an API call to your backend
    try {
      // Example API call (uncomment when ready):
      // const response = await fetch('http://localhost:4500/api/auth/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(registerData)
      // });
      // const result = await response.json();
      // console.log('Register Result:', result);

      // For now, just simulate success
      console.log("Registration successful!");
      alert("Registration successful! Check console for data.");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 200px)", // Account for navbar and footer
          p: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 500 }}>
          <AuthForm
            mode="register"
            title="Create Account"
            subtitle="Join us today and get started"
            onSubmit={handleRegister}
          />

          {/* Link to Login */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Sign in here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Register;
