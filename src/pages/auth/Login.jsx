import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import AuthForm from "../../component/AuthForm";
import Layout from "../../component/Layout";

const Login = () => {
  const handleLogin = async (loginData) => {
    console.log("Login Data:", loginData);

    // Here you would typically make an API call to your backend
    try {
      // Example API call (uncomment when ready):
      // const response = await fetch('http://localhost:4500/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(loginData)
      // });
      // const result = await response.json();
      // console.log('Login Result:', result);

      // For now, just simulate success
      console.log("Login successful!");
      alert("Login successful! Check console for data.");
    } catch (error) {
      console.error("Login error:", error);
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
            mode="login"
            title="Welcome Back"
            subtitle="Sign in to your account"
            onSubmit={handleLogin}
          />

          {/* Link to Register */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Sign up here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;
