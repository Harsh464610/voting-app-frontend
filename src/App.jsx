// src/App.jsx (replace or merge with existing)
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Home from "./pages/Home";
import AuthRoutes from "./pages/auth"; // top-level auth router page (we will create)
// import Election from "./pages/Election";
import NavBar from "./components/NavBar";
import ResetPassword from "./pages/auth/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";

export default function App() {
  useAuth(); // fetch /auth/me on first render

  return (
    <div className="min-h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route
          path="/election/:id"
          element={
            <PrivateRoute>
              <Election />
            </PrivateRoute>
          }
        /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
