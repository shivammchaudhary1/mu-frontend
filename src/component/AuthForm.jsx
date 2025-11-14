import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  BusinessCenter,
} from "@mui/icons-material";

const AuthForm = ({ mode = "login", onSubmit, title, subtitle }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "sales_executive",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isLogin = mode === "login";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prepare data based on mode
      const submitData = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          };

      console.log(`${mode.toUpperCase()} Data:`, submitData);

      // Call parent component's onSubmit function if provided
      if (onSubmit) {
        await onSubmit(submitData);
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
      console.error(`${mode} error:`, err);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card
      sx={{
        maxWidth: 440,
        width: "100%",
        boxShadow: 1,
        borderRadius: 3,
        mx: "auto",
        border: 1,
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: 5 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              mb: 1.5,
              letterSpacing: "-0.025em",
            }}
          >
            {title || (isLogin ? "Welcome Back" : "Create Account")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
            }}
          >
            {subtitle ||
              (isLogin
                ? "Sign in to your account"
                : "Join us today and get started")}
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          {/* Full Name Field - Only for Registration */}
          {!isLogin && (
            <TextField
              fullWidth
              required
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          )}

          {/* Email Field */}
          <TextField
            fullWidth
            required
            type="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            required
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {/* Role Selection - Only for Registration */}
          {!isLogin && (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
                startAdornment={
                  <InputAdornment position="start">
                    <BusinessCenter color="action" />
                  </InputAdornment>
                }
              >
                <MenuItem value="sales_executive">Sales Executive</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
              </Select>
            </FormControl>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              mt: 2,
              mb: 2,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              position: "relative",
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                Processing...
              </>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
