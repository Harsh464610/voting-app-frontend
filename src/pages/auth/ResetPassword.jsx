// src/pages/auth/ResetPassword.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/auth/authSlice";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, setError, formState, watch, clearErrors } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { errors } = formState;
  const resetStatus = useSelector((s) => s.auth.resetPasswordStatus);
  const resetMessage = useSelector((s) => s.auth.resetPasswordMessage);

  useEffect(() => {
    // optional: if no token in URL show message / redirect
    if (!token) {
      // no token — we can show a message or redirect to forgot page
      // navigate("/auth/forgot"); // optional auto-redirect
    }
  }, [token]);

  const onSubmit = async (data) => {
    clearErrors("_form");
    // simple client-side validation for confirm password
    if (!data.password || data.password.length < 3) {
      setError("password", { type: "client", message: "Password must be at least 3 characters" });
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { type: "client", message: "Passwords do not match" });
      return;
    }

    try {
      await dispatch(resetPassword({ token, password: data.password })).unwrap();
      // success — navigate to login with a success notification
      alert(resetMessage || "Password reset successful. Please login.");
      navigate("/auth/login");
    } catch (err) {
      // err may be payload object from rejectWithValue or Error
      const payload = err?.payload || err;
      const serverMessage = payload?.message || payload?.msg || (payload?.response && payload.response.data && payload.response.data.message);

      const fieldErrors = payload?.errors || (payload?.response && payload.response.data && payload.response.data.errors);

      if (fieldErrors && typeof fieldErrors === "object") {
        Object.keys(fieldErrors).forEach((field) => {
          try {
            setError(field, { type: "server", message: fieldErrors[field] });
          } catch (e) {
            // ignore
          }
        });
      } else if (serverMessage) {
        setError("_form", { type: "server", message: serverMessage });
      } else {
        setError("_form", { type: "server", message: "Reset failed. Try again." });
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Set a new password</h2>

      {!token && (
        <div className="mb-4 text-sm text-yellow-700">
          No token found in the URL. Please use the reset link sent to your email or request a new one.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errors._form && <div className="text-sm text-red-600">{errors._form.message}</div>}
        {resetStatus === "succeeded" && resetMessage && <div className="text-sm text-green-600">{resetMessage}</div>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 rounded border border-gray-300"
            placeholder="Enter new password"
          />
          {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full p-2 rounded border border-gray-300"
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={resetStatus === "loading"}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
          >
            {resetStatus === "loading" ? "Submitting..." : "Reset password"}
          </button>

          <Link to="/auth/login" className="text-sm text-gray-600">Back to Login</Link>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm"><Link to="/" className="text-gray-600">Back to Home</Link></p>
        </div>
      </form>
    </div>
  );
}
