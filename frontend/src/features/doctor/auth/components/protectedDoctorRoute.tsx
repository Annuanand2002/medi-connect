import { useAppSelector } from "@/hooks/hooks";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedDoctorRoute = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.authDoctor.isAuthenticated,
  );
  return isAuthenticated ? <Outlet /> : <Navigate to="/doctor/login" replace />;
};
export default ProtectedDoctorRoute;
