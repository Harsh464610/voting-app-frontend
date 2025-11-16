// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

// Thunks
export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, { rejectWithValue }) => {
  try {
    const res = await authService.me();
    // assume backend returns { data: user } or similar
    return res?.data?.data || res?.data;
  } catch (err) {
    return rejectWithValue(err?.response?.data || { message: err.message });
  }
});

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await authService.login(credentials);
    // server should set cookie; assume res returns user data as well
    return res?.data?.data || res?.data;
  } catch (err) {
    return rejectWithValue(err?.response?.data || { message: err.message });
  }
});

export const register = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const res = await authService.register(payload);
    return res?.data?.data || res?.data;
  } catch (err) {
    return rejectWithValue(err?.response?.data || { message: err.message });
  }
});

export const sendOtp = createAsyncThunk("auth/sendOtp", async (email, { rejectWithValue }) => {
  try {
    const res = await authService.sendOtp(email);
    return res?.data || { message: "OTP sent" };
  } catch (err) {
    return rejectWithValue(err?.response?.data || { message: err.message });
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await authService.logout();
    return res?.data || { message: "Logged out" };
  } catch (err) {
    return rejectWithValue(err?.response?.data || { message: err.message });
  }
});

export const resetPasswordEmail = createAsyncThunk("auth/resetPasswordEmail", async (email, { rejectWithValue }) => {
  try {
    const res = await authService.resetPasswordEmail(email);
    return res?.data || { message: "Reset email sent" };
  } catch (err) {
    return rejectWithValue(err?.response?.data || { message: err.message });
  }
});

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await authService.resetPassword({ token, password });
      return res?.data || { message: "Password reset success" };
    } catch (err) {
      // normalize error shape
      return rejectWithValue(err?.response?.data || { message: err.message });
    }
  }
);

const initialState = {
  user: null,
  status: "idle",
  error: null,
  otpStatus: "idle",
  sendOtpMessage: null,
  resetPasswordStatus: "idle",
  resetPasswordMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMe
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload || null;
        state.error = null;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = "idle";
        state.user = null;
        state.error = action.payload?.message || "Failed to fetch user";
      })
      // login
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload || null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
      })
      // register
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload || null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Register failed";
      })
      // sendOtp
      .addCase(sendOtp.pending, (state) => {
        state.otpStatus = "loading";
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.otpStatus = "succeeded";
        state.sendOtpMessage = action.payload?.message || "OTP sent";
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.otpStatus = "failed";
        state.sendOtpMessage = action.payload?.message || "OTP send failed";
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload?.message || "Logout failed";
      })
      // reset password email
      .addCase(resetPasswordEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordEmail.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(resetPasswordEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Reset email failed";
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordStatus = "loading";
        state.resetPasswordMessage = null;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordStatus = "succeeded";
        state.resetPasswordMessage = action.payload?.message || "Password reset successful";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordStatus = "failed";
        state.resetPasswordMessage = action.payload?.message || action.error?.message || "Reset failed";
        // also set top-level error for convenience
        state.error = state.resetPasswordMessage;
      });

  },
});

export const { clearAuthError, clearUser } = authSlice.actions;
export default authSlice.reducer;
