import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import toastReducer from "./slices/toastSlice";
import leadReducer from "./slices/leadSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    leads: leadReducer,
    users: userReducer,
  },
});
