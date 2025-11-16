// src/components/NavBar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function NavBar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold">Voting App</Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="px-3 py-1 rounded hover:bg-gray-100">Dashboard</Link>
              <button onClick={handleLogout} className="px-3 py-1 rounded bg-red-500 text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="px-3 py-1 rounded hover:bg-gray-100">Login</Link>
              <Link to="/auth/register" className="px-3 py-1 rounded bg-blue-600 text-white">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
