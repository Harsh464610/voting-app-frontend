// src/pages/auth/ForgotPassword.jsx
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordEmail } from "../../features/auth/authSlice";
import { TextInput } from "../../components/form";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const methods = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((s) => s.auth.status);

  const onSubmit = async (data) => {
    try {
      await dispatch(resetPasswordEmail(data.email)).unwrap();
      // instruct user to check email
      alert("If that email exists you will receive reset instructions.");
      navigate("/");
    } catch (err) {
      // handled in slice
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Reset password</h2>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <TextInput name="email" label="Email" rules={{ required: "Email required" }} />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            {status === "loading" ? "Sending..." : "Send reset email"}
          </button>

          <div className="pt-4 border-t">
            <p className="text-sm"><Link to="/auth/login" className="text-blue-600">Back to Login</Link></p>
            <p className="text-sm mt-2"><Link to="/" className="text-gray-600">Back to Home</Link></p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
