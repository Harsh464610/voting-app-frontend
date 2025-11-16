// src/services/authService.js
import api from "../lib/axios.js";
import routes from "./apiRoutes.js";

const authService = {
  sendOtp: (email) => api.post(routes.auth.sendOtp, { email }),
  register: (payload) => api.post(routes.auth.register, payload),
  login: (payload) => api.post(routes.auth.login, payload),
  logout: () => api.post(routes.auth.logout),
  me: () => api.get(routes.auth.me),
  resetPasswordEmail: (email) => api.post(routes.auth.resetPasswordEmail, { email }),
  resetPassword: (payload) => api.post(routes.auth.resetPassword, payload),
};

export default authService;
