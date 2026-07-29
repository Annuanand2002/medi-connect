import { store } from "@/app/store/store";
import axios, { type InternalAxiosRequestConfig } from "axios";
import { logout, loginSuccess } from "@/features/admin/auth/redux/authSlice";
import { refreshToken } from "@/features/admin/auth/api/refreshTokenApi";

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryRequestConfig;
    const authRoutes = [
      "/admin/login",
      "/admin/refresh-token",
      "/doctor/login",
      "/doctor/refresh-token",
    ];
    const isAuthRoute = authRoutes.some((route) =>
      originalRequest.url?.includes(route),
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      try {
        const response = await refreshToken();

        store.dispatch(
          loginSuccess({
            admin: response.result.admin,
            accessToken: response.result.accessToken,
          }),
        );

        originalRequest.headers.Authorization = `Bearer ${response.result.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        store.dispatch(logout());

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
