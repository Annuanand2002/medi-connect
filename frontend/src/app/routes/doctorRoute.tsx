import ProtectedDoctorRoute from "@/features/doctor/auth/components/protectedDoctorRoute";
import PublicDoctorRoute from "@/features/doctor/auth/components/publicDoctorRoute";
import LoginDoctorPage from "@/features/doctor/auth/pages/DcotorLogin";
import DoctorDashboard from "@/features/doctor/pages/doctorDashboard";
import DoctorRequestPage from "@/features/doctor/pages/doctorRequestFrorm.page";
import RequestResetPasswordPage from "@/features/doctor/pages/Request-ResetPasswordLink";
import ResetPasswordPage from "@/features/doctor/pages/resetPassword";
import RetryDoctorPage from "@/features/doctor/pages/RetryDoctorPage";
import SetupPasswordPage from "@/features/doctor/pages/SetPasswordPage";
import { Route, Routes } from "react-router-dom";

const DoctorRoute = () => {
  return (
    <Routes>
      <Route element={<PublicDoctorRoute />}>
        <Route path="/apply" element={<DoctorRequestPage />} />
        <Route path="/setup-password" element={<SetupPasswordPage />} />
        <Route path="/login" element={<LoginDoctorPage />} />
        <Route path="/retry" element={<RetryDoctorPage />} />
        <Route path="/request-resetpassword" element={<RequestResetPasswordPage />} />
        <Route path="/reset-password" element = {<ResetPasswordPage/>}/>
      </Route>
      <Route element={<ProtectedDoctorRoute />}>
        <Route path="/dashboard" element={<DoctorDashboard />} />
      </Route>
    </Routes>
  );
};

export default DoctorRoute;
