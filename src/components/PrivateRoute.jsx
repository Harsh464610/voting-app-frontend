import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, redirectTo = "/auth/login" }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
