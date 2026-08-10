import { Route, Routes, } from "react-router-dom";
import PublicPatientRoute from "@/features/patient/auth/components/publicPatientRoute";
import LoginPatientPage from "@/features/patient/auth/pages/patientLoginPage";
import ProtectedPatientRoute from "@/features/patient/auth/components/protectedPatientRoute";
import PatientDashboard from "@/features/patient/pages/patientDashboard";
import RequestResetPatientPasswordPage from "@/features/patient/pages/requestPassowrdResetPage";
import ResetPatientPasswordPage from "@/features/patient/pages/resetPatientPassowrdPage";
import RegiesterPatientPage from "@/features/patient/pages/registerPatientPage";
import VerifyOTPPage from "@/features/patient/pages/OTPPage";


const PatientRoute = () => {
  return (
    <Routes>
      <Route element={<PublicPatientRoute/>}>
        <Route path="/login" element={<LoginPatientPage/>}/>
        <Route path="/request-reset" element={<RequestResetPatientPasswordPage/>}/>
        <Route path="/reset-password" element={<ResetPatientPasswordPage/>}/>
        <Route path="/create-patient" element={<RegiesterPatientPage/>}/>
        <Route path="/verify-otp" element={<VerifyOTPPage/>}/>
      </Route>

      <Route element={<ProtectedPatientRoute/>}>
       <Route path="/dashboard" element={<PatientDashboard/>}/>
      </Route>
    </Routes>
  )
}
export default PatientRoute;