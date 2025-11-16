// src/pages/auth/Login.jsx
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { TextInput } from "../../components/form";

export default function Login() {
  const methods = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((s) => s.auth.status);
  const authError = useSelector((s) => s.auth.error);

  const onSubmit = async (data) => {
    try {
      const user = await dispatch(login(data)).unwrap();
      // if server returns user, we can navigate
      if (user) navigate("/");
    } catch (err) {
      // error handled by slice; optionally show toast
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <TextInput name="email" label="Email" rules={{ required: "Email required" }} />
          <TextInput name="password" label="Password" type="password" rules={{ required: "Password required" }} />
          {authError && <p className="text-sm text-red-600">{authError}</p>}

          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {authStatus === "loading" ? "Signing in..." : "Sign in"}
            </button>

            <Link to="/auth/forgot" className="text-sm text-blue-600">Forgot password?</Link>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm">Don't have an account? <Link to="/auth/register" className="text-blue-600">Signup</Link></p>
            <p className="text-sm mt-2"><Link to="/" className="text-gray-600">Back to Home</Link></p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
