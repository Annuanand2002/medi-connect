import { useAppSelector } from "@/hooks/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PublicDoctorRoute = () => {
  const { isAuthenticated, isLoading } = useAppSelector(
    (state) => state.authDoctor,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? (
    <Navigate to="/doctor/dashboard" replace />
  ) : (
    <Outlet />
  );
};

export default PublicDoctorRoute;
