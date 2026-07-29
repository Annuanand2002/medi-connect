import type { Admin } from "@/entites/admin/authTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  admin: Admin | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  admin: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        admin: Admin;
        accessToken: string;
      }>,
    ) => {
      state.admin = action.payload.admin;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.admin = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});
export const { loginSuccess, logout, setAccessToken, finishLoading } =
  authSlice.actions;
export default authSlice.reducer;
