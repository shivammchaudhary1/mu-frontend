import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Admin from "../pages/Admin/Admin";
import Manager from "../pages/manager/Manager";
import Sales from "../pages/sales/Sales";
import ProtectedRoute from "../component/ProtectedRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute requireAuth={false}>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAuth={true}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager"
        element={
          <ProtectedRoute requireAuth={true}>
            <Manager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales"
        element={
          <ProtectedRoute requireAuth={true}>
            <Sales />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
