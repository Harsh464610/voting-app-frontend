import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Signup />} />
      <Route path="forgot" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
}
