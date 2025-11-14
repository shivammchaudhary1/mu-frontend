import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import AuthForm from "../../component/AuthForm";
import Layout from "../../component/Layout";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

const Login = () => {
  const dispatchToRedux = useDispatch();

  const handleLogin = async (loginData) => {
    try {
      dispatchToRedux(login(loginData));
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
