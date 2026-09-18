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

import { refreshToken } from "@/features/admin/auth/api/authentication";
import { refreshDoctorToken } from "@/features/doctor/auth/api/doctorauthentication.api";
import { refreshPatientToken } from "@/features/patient/auth/api/patientauthentication.api";

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
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
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

  "/doctor/request-resetpassword",
  "/doctor/reset-password",
  "/doctor/setup-password",
  "/doctor/retry",

  "/patient/requeset-reset",
  "/patient/reset-password",
  "/patient/create-patient",
];

const DOCTOR_BLOCKED_MESSAGE =
  "Your account has been blocked. Please contact customer care.";

const PATIENT_BLOCKED_MESSAGE =
  "Your account has been blocked. Please contact customer care.";

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as RetryRequestConfig;

    const status = error.response?.status;

    const role = getRoleFromUrl(originalRequest?.url);
    //doctorblocked
    if (
      status === 403 &&
      role === "doctor" &&
      error.response?.data?.message === DOCTOR_BLOCKED_MESSAGE
    ) {
      store.dispatch(logoutDoctor());

      window.location.href = `/doctor/login?error=${encodeURIComponent(
        "Your account has been blocked. Please contact customer care.",
      )}`;

      return Promise.reject(error);
    }
    if (
      status === 403 &&
      error.response?.data?.message === PATIENT_BLOCKED_MESSAGE &&
      role === "patient"
    ) {
      store.dispatch(logoutPatient());

      window.location.replace(
        `/patient/login?error=${encodeURIComponent(PATIENT_BLOCKED_MESSAGE)}`,
      );

      return Promise.reject(error);
    }

    const isAuthRoute = authRoutes.some((route) =>
      originalRequest.url?.includes(route),
    );

    if (status === 401 && !originalRequest._retry && !isAuthRoute) {
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

        // Put new token into original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry original request
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
