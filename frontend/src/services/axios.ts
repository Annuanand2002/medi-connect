import { store } from "@/store/store";
import axios, { type InternalAxiosRequestConfig } from "axios";
import { logout, loginSuccess } from "@/features/admin/auth/redux/authSlice";
import {
  loginDoctorSuccess,
  logoutDoctor,
} from "@/features/doctor/auth/redux/authDoctor.slice";
import {
  loginPatientSuccess,
  logoutPatient,
} from "@/features/patient/auth/redux/patient.auth.slice";
import { refreshToken } from "@/features/admin/auth/api/refreshTokenApi";
import { refreshPatientToken } from "@/features/patient/auth/api/refreshPatientToken";
import { refreshDoctorToken } from "@/features/doctor/auth/api/refreshDoctorToken";

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
const getAccessToken = (url?: string) => {
  if (url?.startsWith("/admin")) {
    return store.getState().auth.accessToken;
  }

  if (url?.startsWith("/doctor")) {
    return store.getState().authDoctor.accessToken;
  }

  if (url?.startsWith("/patient")) {
    return store.getState().authPatient.accessToken;
  }

  return null;
};
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken(config.url);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
const getRoleFromUrl = (
  url?: string,
): "admin" | "doctor" | "patient" | null => {
  if (url?.startsWith("/admin")) {
    return "admin";
  }

  if (url?.startsWith("/doctor")) {
    return "doctor";
  }

  if (url?.startsWith("/patient")) {
    return "patient";
  }

  return null;
};
const authRoutes = [
  "/admin/login",
  "/admin/refresh-token",

  "/doctor/login",
  "/doctor/refresh-token",

  "/patient/login",
  "/patient/refresh-token",

  "/admin/forgot-password",
  "/admin/reset-password",

  "/doctor/forgot-password",
  "/doctor/reset-password",

  "/patient/forgot-password",
  "/patient/reset-password",
];
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as RetryRequestConfig;

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
        const role = getRoleFromUrl(originalRequest.url);

        if (!role) {
          return Promise.reject(error);
        }

        let accessToken: string;

        if (role === "admin") {
          const response = await refreshToken();

          accessToken = response.result.accessToken;

          store.dispatch(
            loginSuccess({
              admin: response.result.admin,
              accessToken,
            }),
          );
        } else if (role === "doctor") {
          const response = await refreshDoctorToken();

          accessToken = response.result.accessToken;

          store.dispatch(
            loginDoctorSuccess({
              doctor: response.result.doctor,
              accessToken,
            }),
          );
        } else {
          const response = await refreshPatientToken();

          accessToken = response.result.accessToken;

          store.dispatch(
            loginPatientSuccess({
              patient: response.result.patient,
              accessToken,
            }),
          );
        }

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry the original request

        return axiosInstance(originalRequest);
      } catch (err) {
        const role = getRoleFromUrl(originalRequest.url);

        if (role === "admin") {
          store.dispatch(logout());
        }

        if (role === "doctor") {
          store.dispatch(logoutDoctor());
        }

        if (role === "patient") {
          store.dispatch(logoutPatient());
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
