// src/pages/auth/Signup.jsx
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { register as registerThunk, sendOtp } from "../../features/auth/authSlice";
import { TextInput, SelectInput } from "../../components/form";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const methods = useForm({
        defaultValues: {
            role: "",
        },
    });
    const { register, handleSubmit, setError, watch, clearErrors, reset } = methods;


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const otpStatus = useSelector((s) => s.auth.otpStatus);
    const authStatus = useSelector((s) => s.auth.status);
    const authError = useSelector((s) => s.auth.error); // <- global error from slice

    const [showPassword, setShowPassword] = useState(false);

    const email = watch("email");

    const onSendOtp = async () => {
        // clear previous form errors so user can resend immediately
        clearErrors();
        if (!email) {
            setError("email", { type: "client", message: "Please enter email first" });
            return;
        }
        try {
            await dispatch(sendOtp(email)).unwrap();
            alert("OTP sent — check your email");
        } catch (err) {
            const msg = err?.message || err?.payload?.message || err?.payload?.msg || (err?.response && err.response.data && err.response.data.message);
            // map server field errors if present
            const fieldErrors = err?.payload?.errors || (err?.response && err.response.data && err.response.data.errors);
            if (fieldErrors) {
                Object.keys(fieldErrors).forEach((field) => {
                    try { setError(field, { type: "server", message: fieldErrors[field] }); } catch (e) { }
                });
            } else {
                setError("_form", { type: "server", message: msg || "Failed to send OTP" });
            }
        }
    };

    const onSubmit = async (data) => {
        // clear previous errors so user can attempt again immediately
        clearErrors();

        try {
            await dispatch(registerThunk(data)).unwrap();
            // on success, optionally reset or navigate
            reset();
            navigate("/");
        } catch (err) {
            const payload = err?.payload || err; // unwrap often throws payload
            const serverMessage = payload?.message || payload?.msg || (payload?.response && payload.response.data && payload.response.data.message);

            const fieldErrors = payload?.errors || (payload?.response && payload.response.data && payload.response.data.errors);

            if (fieldErrors && typeof fieldErrors === "object") {
                Object.keys(fieldErrors).forEach((field) => {
                    // ensure field name matches what your form registers
                    try {
                        setError(field, { type: "server", message: fieldErrors[field] });
                    } catch (e) {
                        // ignore unknown fields
                    }
                });
                return; // don't set a global form error if we've attached field errors
            }

            // general error
            if (serverMessage) {
                setError("_form", { type: "server", message: serverMessage });
            } else {
                setError("_form", { type: "server", message: "Signup failed. Try again." });
            }
        }
    };


    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Signup</h2>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* show global auth error from redux if present */}
                    {authError && <div className="text-sm text-red-600">{authError}</div>}

                    {/* show form-level server error from RHF */}
                    {methods.formState.errors._form && (
                        <div className="text-sm text-red-600">{methods.formState.errors._form.message}</div>
                    )}

                    <TextInput name="firstName" label="First name" rules={{ required: "First name required" }} />
                    <TextInput name="lastName" label="Last name" rules={{ required: "Last name required" }} />

                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <TextInput name="email" label="Email" rules={{ required: "Email required" }} />
                        </div>
                        <div className="w-32">
                            <button type="button" onClick={onSendOtp} className="px-3 py-2 bg-gray-800 text-white rounded w-full">
                                {otpStatus === "loading" ? "Sending..." : "Send OTP"}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="flex">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password required", minLength: { value: 3, message: "Min 3 chars" } })}
                                className="w-full p-2 rounded border border-gray-300"
                                placeholder="Enter password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="ml-2 px-3 bg-gray-100 border rounded"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {methods.formState.errors.password && (
                            <p className="text-xs text-red-600 mt-1">{methods.formState.errors.password.message}</p>
                        )}
                    </div>

                    <TextInput
                        name="otp"
                        label="OTP (6 digits)"
                        rules={{
                            required: "OTP required",
                            minLength: { value: 6, message: "6 digits" },
                            maxLength: { value: 6, message: "6 digits" },
                        }}
                    />

                    <SelectInput
                        name="role"
                        label="Select role"
                        options={[
                            { value: "", label: "Select role" },
                            { value: "politician", label: "Politician" },
                            { value: "voter", label: "Voter" },
                        ]}
                        rules={{ validate: (v) => (v ? true : "Role required") }}
                        dark={true}
                    />

                    <div className="flex items-center gap-3">
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                            {authStatus === "loading" ? "Signing up..." : "Signup"}
                        </button>

                        <Link to="/auth/login" className="text-sm text-blue-600">Have an account? Login</Link>
                    </div>

                    <div className="pt-4 border-t">
                        <p className="text-sm"><Link to="/" className="text-gray-600">Back to Home</Link></p>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
