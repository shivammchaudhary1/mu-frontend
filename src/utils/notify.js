import toast from "react-hot-toast";
import { store } from "../redux/store";
import { addNotification } from "../redux/slices/toastSlice";

/**
 * General notification function
 * @param {string} status - 'success', 'error', or 'warning'
 * @param {string} message - The notification message
 * @param {object} options - Additional options for customization
 */
export const notify = (status, message, options = {}) => {
  // Dispatch to Redux store for tracking
  store.dispatch(
    addNotification({
      status,
      message,
      ...options,
    })
  );

  // Configure toast styles based on status
  const toastOptions = {
    duration: options.duration || 4000,
    position: options.position || "top-right",
    style: {
      borderRadius: "8px",
      background: getBackgroundColor(status),
      color: "#fff",
      fontWeight: "500",
      fontSize: "14px",
      padding: "12px 16px",
      maxWidth: "400px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    iconTheme: {
      primary: "#fff",
      secondary: getBackgroundColor(status),
    },
    ...options.toastOptions,
  };

  // Show appropriate toast based on status
  switch (status) {
    case "success":
      return toast.success(message, toastOptions);
    case "error":
      return toast.error(message, toastOptions);
    case "failure":
      return toast.error(message, toastOptions);
    case "warning":
      return toast(message, {
        ...toastOptions,
        icon: "⚠️",
      });
    default:
      return toast(message, toastOptions);
  }
};

/**
 * Get background color based on status
 * @param {string} status - The notification status
 * @returns {string} - The background color
 */
const getBackgroundColor = (status) => {
  switch (status) {
    case "success":
      return "#10b981"; // Green
    case "error":
    case "failure":
      return "#ef4444"; // Red
    case "warning":
      return "#f59e0b"; // Yellow/Orange
    default:
      return "#3b82f6"; // Blue
  }
};

// Convenience functions for specific statuses
export const notifySuccess = (message, options = {}) =>
  notify("success", message, options);

export const notifyError = (message, options = {}) =>
  notify("error", message, options);

export const notifyWarning = (message, options = {}) =>
  notify("warning", message, options);

// Function to dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};

// Function to dismiss specific toast
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};
