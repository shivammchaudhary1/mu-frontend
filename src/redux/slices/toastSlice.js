import { createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

const initialState = {
  notifications: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, removeNotification, clearAllNotifications } =
  toastSlice.actions;

// Alias for consistency with other components
export const showToast = addNotification;

export default toastSlice.reducer;

// import { notify, notifySuccess, notifyError, notifyWarning } from '../utils/notify';

// // Usage examples:
// notify('success', 'User registered successfully!');
// notify('error', 'Login failed. Please try again.');
// notify('warning', 'Please verify your email address.');

// // Or use convenience functions:
// notifySuccess('Registration successful!');
// notifyError('Something went wrong!');
// notifyWarning('Session expiring soon!');

// Import the notify function anywhere in your components
// import { notify, notifySuccess, notifyError, notifyWarning } from '../utils/notify';

// // In your components:
// const handleSubmit = () => {
//   try {
//     // API call
//     notifySuccess('Data saved successfully!');
//   } catch (error) {
//     notifyError('Failed to save data. Please try again.');
//   }
// };

// // Custom options
// notify('warning', 'Custom message', {
//   duration: 6000,
//   position: 'top-center'
// });
