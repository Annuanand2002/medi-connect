import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { refreshToken } from "../api/refreshTokenApi";
import { finishLoading, loginSuccess, logout } from "../redux/authSlice";

interface Props {
  children: React.ReactNode;
}

const AuthInitializer = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.auth.isLoading);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await refreshToken();

        dispatch(
          loginSuccess({
            admin: response.result.admin,
            accessToken: response.result.accessToken,
          }),
        );
      } catch {
        dispatch(logout());
      } finally {
        dispatch(finishLoading());
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthInitializer;
