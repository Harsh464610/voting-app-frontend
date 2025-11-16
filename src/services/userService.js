// src/services/userService.js
import api from "../lib/axios";
import routes from "./apiRoutes";

const userService = {
  getProfile: () => {
    // prefer user.me if present otherwise fallback to auth.me
    const url = routes.user.me || routes.auth.me;
    return api.get(url);
  },

  updateProfile: (payload) => {
    // payload: { name, age, address, mobileNumber, state } (adjust keys to backend)
    return api.put(routes.user.updateProfile, payload);
  },

  updateCandidateProfile: (payload) => {
    // payload: { partyName }
    return api.put(routes.user.updateCandidateProfile, payload);
  },

  updateProfilePicture: (file) => {
    // file: File
    const fd = new FormData();
    fd.append("profilePicture", file);
    return api.put(routes.user.updateUserProfilePicture, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateSymbol: (file) => {
    // file: File
    const fd = new FormData();
    fd.append("symbol", file);
    return api.put(routes.user.updateSymbol, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default userService;
