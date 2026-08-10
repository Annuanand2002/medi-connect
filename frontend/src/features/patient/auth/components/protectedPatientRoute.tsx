import { useAppSelector } from "@/hooks/hooks";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedPatientRoute = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.authPatient.isAuthenticated,
  );
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/patient/login" replace />
  );
};
export default ProtectedPatientRoute;
