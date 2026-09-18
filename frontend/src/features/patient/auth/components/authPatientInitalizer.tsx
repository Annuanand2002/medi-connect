import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  loginPatientSuccess,
  logoutPatient,
} from "../redux/patient.auth.slice";
import { finishPatientLoading } from "../redux/patient.auth.slice";
import { refreshPatientToken } from "../api/patientauthentication.api";

interface Props {
  children: React.ReactNode;
}

const AuthPatientInitializer = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.authPatient.isLoading);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await refreshPatientToken();

        dispatch(
          loginPatientSuccess({
            patient: response.result.patient,
            accessToken: response.result.accessToken,
          }),
        );
      } catch {
        dispatch(logoutPatient());
      } finally {
        dispatch(finishPatientLoading());
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

export default AuthPatientInitializer;
