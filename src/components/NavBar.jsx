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
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-white tracking-wide hover:text-blue-400 transition duration-300"
        >
          Voting<span className="text-blue-500">App</span>
        </Link>
        <Link
          to="/contact"
          className="text-2xl font-bold text-white tracking-wide hover:text-blue-400 transition duration-300"
        >
          Contact Us
        </Link>
        <Link
          to="/about"
          className="text-2xl font-bold text-white tracking-wide hover:text-blue-400 transition duration-300"
        >
          About Us
        </Link>

        {/* MENU */}
        <div className="flex items-center gap-4">

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-blue-500/30"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-red-500/40"
              >
                Logout
              </button>
              <img src={localStorage.getItem("profileUrl")} className="rounded-full w-10 h-10 border-3 border-red-500"/>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="px-4 py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-gray-500/30"
              >
                Login
              </Link>

              <Link
                to="/auth/register"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-blue-500/40"
              >
                Signup
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
