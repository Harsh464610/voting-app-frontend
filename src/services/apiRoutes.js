// src/services/apiRoutes.js
const AUTH_BASE = "/auth";
const USER_BASE = "/user";
const VOTE_BASE = "/vote";

const apiRoutes = {
  auth: {
    sendOtp: `${AUTH_BASE}/send-otp`,
    register: `${AUTH_BASE}/register`,
    login: `${AUTH_BASE}/login`,
    logout: `${AUTH_BASE}/logout`,
    me: `${AUTH_BASE}/me`,
    resetPasswordEmail: `${AUTH_BASE}/reset-password-email`,
    resetPassword: `${AUTH_BASE}/reset-password`,
  },
  user: {
    me: `${USER_BASE}/me`, // optional; you may already use /auth/me - both are common
    updateProfile: `${USER_BASE}/update-profile`,
    updateCandidateProfile: `${USER_BASE}/update-candidate-profile`,
    updateUserProfilePicture: `${USER_BASE}/update-user-profile-picture`,
    updateSymbol: `${USER_BASE}/update-symbol`,
  },
  vote: {
    fetchState: `${VOTE_BASE}/fetch-state`,
  },
};

export default apiRoutes;
