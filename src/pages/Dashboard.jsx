// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { fetchMe } from "../features/auth/authSlice";
import userService from "../services/userService";
import voteService from "../services/voteService"; // optional: to fetch states
import { TextInput, SelectInput, FileInput } from "../components/form";
import { useNavigate } from "react-router-dom";

/**
 * Dashboard: textual profile + file uploads.
 * - Uploads send file to backend. Backend must return updated user (or we call fetchMe()).
 * - No local object URL previews — we read images from backend user fields.
 */
export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((s) => s.auth.user);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [serverError, setServerError] = useState(null);

  // states list (optional)
  const [states, setStates] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);

  // form (text fields)
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      address: "",
      mobileNumber: "",
      state: "",
      partyName: "",
    },
  });

  const { reset, handleSubmit, setError, clearErrors, watch } = methods;

  // fetch states (optional)
  useEffect(() => {
    let mounted = true;
    const loadStates = async () => {
      setStatesLoading(true);
      try {
        const res = await voteService.fetchStates();
        const data = res?.data?.data || res?.data || [];
        if (!mounted) return;
        const opts = Array.isArray(data)
          ? data.map((s) => ({ value: s._id || s.id || s.value || s, label: s.name || s.label || String(s) }))
          : [];
        setStates(opts);
      } catch (err) {
        console.error("Failed to load states", err);
      } finally {
        if (mounted) setStatesLoading(false);
      }
    };
    loadStates();
    return () => (mounted = false);
  }, []);

  // prefill text fields from authUser
  useEffect(() => {
    if (authUser) {
      reset({
        firstName: authUser.firstName || authUser.firstname || "",
        lastName: authUser.lastName || authUser.lastName || "",
        age: authUser.age || "",
        address: authUser.address || "",
        mobileNumber: authUser.mobileNumber || authUser.mobile || "",
        state: authUser.state || "",
        partyName: authUser.partyName || "",
      });
    } else {
      // if not logged in, try fetching user
      dispatch(fetchMe());
    }
  }, [authUser, reset, dispatch]);

  const refreshProfile = async () => {
    try {
      await dispatch(fetchMe()).unwrap();
    } catch (err) {
      console.warn("refreshProfile failed", err);
    }
  };

  // Submit textual profile
  const onSubmitProfile = async (data) => {
    clearErrors();
    setServerError(null);
    try {
      setLoadingProfile(true);
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age || undefined,
        address: data.address || undefined,
        mobileNumber: data.mobileNumber || undefined,
        state: data.state || undefined,
      };
      await userService.updateProfile(payload);
      await refreshProfile();
      alert("Profile updated");
    } catch (err) {
      const payload = err?.response?.data || err;
      const message = payload?.message || payload?.msg || "Failed to update profile";
      setServerError(message);

      const fieldErrors = payload?.errors;
      if (fieldErrors && typeof fieldErrors === "object") {
        Object.keys(fieldErrors).forEach((f) => {
          try {
            setError(f, { type: "server", message: fieldErrors[f] });
          } catch {}
        });
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  // Candidate-only update (partyName)
  const onUpdateCandidate = async (data) => {
    clearErrors();
    setServerError(null);
    try {
      setLoadingProfile(true);
      await userService.updateCandidateProfile({ partyName: data.partyName });
      await refreshProfile();
      alert("Candidate details updated");
    } catch (err) {
      const payload = err?.response?.data || err;
      const message = payload?.message || "Failed to update candidate details";
      setServerError(message);
      const fieldErrors = payload?.errors;
      if (fieldErrors && typeof fieldErrors === "object") {
        Object.keys(fieldErrors).forEach((f) => {
          try {
            setError(f, { type: "server", message: fieldErrors[f] });
          } catch {}
        });
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  // Upload profile picture file (send to backend, then refresh user)
  const onUploadProfilePicture = async (file) => {
    if (!file) return;
    setServerError(null);
    try {
      setLoadingFiles(true);
      const res = await userService.updateProfilePicture(file);
      // backend may return updated user or a message; we re-fetch to be safe
      await refreshProfile();
      alert("Profile picture updated");
    } catch (err) {
      const payload = err?.response?.data || err;
      setServerError(payload?.message || "Failed to upload profile picture");
    } finally {
      setLoadingFiles(false);
    }
  };

  // Upload symbol file (politician)
  const onUploadSymbol = async (file) => {
    if (!file) return;
    setServerError(null);
    try {
      setLoadingFiles(true);
      await userService.updateSymbol(file);
      await refreshProfile();
      alert("Symbol updated");
    } catch (err) {
      const payload = err?.response?.data || err;
      setServerError(payload?.message || "Failed to upload symbol");
    } finally {
      setLoadingFiles(false);
    }
  };

  // Render image src from authUser fields (handles string or object from backend)
  const getImageUrl = (field) => {
    if (!field) return null;
    if (typeof field === "string") return field;
    if (field.secure_url) return field.secure_url;
    if (field.url) return field.url;
    if (field.secureUrl) return field.secureUrl;
    return null;
  };

  // optional redirect if not logged in
  useEffect(() => {
    if (!authUser) {
      // navigate("/auth/login");
    }
  }, [authUser, navigate]);

  const profileUrl = getImageUrl(authUser?.profilePicture || authUser?.profilePictureUrl || authUser?.profile_picture);
  const symbolUrl = getImageUrl(authUser?.symbol || authUser?.symbolUrl || authUser?.symbol_url);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {serverError && <div className="text-sm text-red-400">{serverError}</div>}

      <FormProvider {...methods}>
        {/* Profile details */}
        <section className="bg-gray-800 p-6 rounded shadow">
          <h2 className="text-lg font-medium mb-4">Profile details</h2>
          <form onSubmit={handleSubmit(onSubmitProfile)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput name="firstName" label="First name" rules={{ required: "Required" }} />
            <TextInput name="lastName" label="Last name" rules={{ required: "Required" }} />
            <TextInput name="age" label="Age" rules={{ pattern: { value: /^\d+$/, message: "Must be a number" } }} />
            <TextInput name="mobileNumber" label="Mobile number" />
            <TextInput name="address" label="Address" />
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200">State</label>
              <SelectInput
                name="state"
                options={[{ value: "", label: statesLoading ? "Loading..." : "Select state" }, ...states]}
                rules={{ validate: (v) => (v ? true : "State required") }}
                dark={true}
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex items-center gap-3">
              <button type="submit" disabled={loadingProfile} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60">
                {loadingProfile ? "Saving..." : "Save profile"}
              </button>
            </div>
          </form>
        </section>

        {/* Politician-only */}
        {authUser && authUser.role === "politician" && (
          <section className="bg-gray-800 p-6 rounded shadow">
            <h2 className="text-lg font-medium mb-4">Candidate details</h2>
            <form onSubmit={handleSubmit(onUpdateCandidate)} className="grid grid-cols-1 gap-4">
              <TextInput name="partyName" label="Party name" rules={{ required: "Required" }} />
              <div>
                <button type="submit" disabled={loadingProfile} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60">
                  {loadingProfile ? "Saving..." : "Save candidate details"}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* File uploads */}
        <section className="bg-gray-800 p-6 rounded shadow">
          <h2 className="text-lg font-medium mb-4">Profile pictures & files</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile picture */}
            <div>
              <h3 className="font-medium mb-2">Profile picture</h3>
              <div className="mb-3">
                {profileUrl ? (
                  <img src={profileUrl} alt="profile" className="w-36 h-36 object-cover rounded-full border" />
                ) : (
                  <div className="w-36 h-36 bg-gray-700 rounded-full flex items-center justify-center text-gray-400">No image</div>
                )}
              </div>

              <FileInput
                name="profilePicture"
                label="Choose profile picture"
                accept="image/*"
                preview={false}
                multiple={false}
                control={null}
                onFileSelect={(file) => onUploadProfilePicture(file)}
                initialPreview={profileUrl}
                dark={true}
              />
            </div>

            {/* Symbol for politician */}
            {authUser && authUser.role === "politician" && (
              <div>
                <h3 className="font-medium mb-2">Symbol (for politician)</h3>
                <div className="mb-3">
                  {symbolUrl ? (
                    <img src={symbolUrl} alt="symbol" className="w-36 h-36 object-cover rounded border" />
                  ) : (
                    <div className="w-36 h-36 bg-gray-700 rounded flex items-center justify-center text-gray-400">No symbol</div>
                  )}
                </div>

                <FileInput
                  name="symbol"
                  label="Choose symbol image"
                  accept="image/*"
                  preview={false}
                  multiple={false}
                  control={null}
                  onFileSelect={(file) => onUploadSymbol(file)}
                  initialPreview={symbolUrl}
                  dark={true}
                />
              </div>
            )}
          </div>
        </section>
      </FormProvider>
    </div>
  );
}
