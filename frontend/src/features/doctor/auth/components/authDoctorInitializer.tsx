import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { refreshDoctorToken } from "../api/refreshDoctorToken";
import { finishDoctorLoading, loginDoctorSuccess, logoutDoctor } from "../redux/authDoctor.slice";



interface Props {
  children: React.ReactNode;
}

const AuthDoctorInitializer = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.authDoctor.isLoading);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await refreshDoctorToken();

        dispatch(
          loginDoctorSuccess({
            doctor: response.result.doctor,
            accessToken: response.result.accessToken,
          }),
        );
      } catch {
        dispatch(logoutDoctor());
      } finally {
        dispatch(finishDoctorLoading());
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

export default AuthDoctorInitializer;
