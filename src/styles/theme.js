import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // Modern blue
      light: "#60a5fa",
      dark: "#1d4ed8",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#64748b", // Sophisticated gray
      light: "#94a3b8",
      dark: "#475569",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fafafa", // Clean white-gray
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b", // Dark gray for excellent readability
      secondary: "#64748b", // Medium gray
      disabled: "#cbd5e1",
    },
    error: {
      main: "#ef4444",
      light: "#fca5a5",
      dark: "#dc2626",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    info: {
      main: "#3b82f6",
      light: "#93c5fd",
      dark: "#1d4ed8",
    },
    success: {
      main: "#10b981",
      light: "#6ee7b7",
      dark: "#047857",
    },
    grey: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    divider: "#e5e7eb",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "-0.025em",
      color: "#1e293b",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.025em",
      color: "#1e293b",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "-0.025em",
      color: "#1e293b",
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
      color: "#1e293b",
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#1e293b",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#1e293b",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#374151",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      color: "#6b7280",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      textTransform: "none",
      letterSpacing: "0.025em",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.5,
      color: "#6b7280",
    },
  },
  shape: {
    borderRadius: 8, // Modern rounded corners
  },
  shadows: [
    "none",
    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  ],
  components: {
    // Button styling
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "0.875rem",
          fontWeight: 500,
          textTransform: "none",
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          },
        },
        outlined: {
          borderWidth: 1.5,
          "&:hover": {
            borderWidth: 1.5,
            backgroundColor: "rgba(37, 99, 235, 0.04)",
          },
        },
      },
    },
    // Card styling
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    // TextField styling
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#ffffff",
            transition: "all 0.2s ease-in-out",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#93c5fd",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: 2,
              borderColor: "#2563eb",
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: "0.875rem",
            "&.Mui-focused": {
              color: "#2563eb",
            },
          },
        },
      },
    },
    // AppBar styling
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#1e293b",
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          borderBottom: "1px solid #e5e7eb",
        },
      },
    },
    // Chip styling
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontSize: "0.75rem",
          fontWeight: 500,
        },
      },
    },
    // Paper styling
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        outlined: {
          border: "1px solid #e5e7eb",
        },
      },
    },
  },
  spacing: 8, // 8px base spacing unit
});

export default theme;
