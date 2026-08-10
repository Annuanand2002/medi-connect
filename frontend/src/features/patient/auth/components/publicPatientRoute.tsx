import { useAppSelector } from "@/hooks/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PublicPatientRoute = () => {
  const { isAuthenticated, isLoading } = useAppSelector(
    (state) => state.authPatient,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? (
    <Navigate to="/patient/dashboard" replace />
  ) : (
    <Outlet />
  );
};

export default PublicPatientRoute;
