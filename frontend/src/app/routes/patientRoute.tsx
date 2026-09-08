import { Route, Routes } from "react-router-dom";
import PublicPatientRoute from "@/features/patient/auth/components/publicPatientRoute";
import LoginPatientPage from "@/features/patient/auth/pages/patientLoginPage";
import ProtectedPatientRoute from "@/features/patient/auth/components/protectedPatientRoute";
import PatientDashboard from "@/features/patient/pages/patientDashboard";
import RequestResetPatientPasswordPage from "@/features/patient/pages/requestPassowrdResetPage";
import ResetPatientPasswordPage from "@/features/patient/pages/resetPatientPassowrdPage";
import RegiesterPatientPage from "@/features/patient/pages/registerPatientPage";
import VerifyOTPPage from "@/features/patient/pages/OTPPage";
import DoctorPageList from "@/features/patient/appointment/pages/doctorListingPage";
import AppointmentBookingPage from "@/features/patient/appointment/pages/bookingPage";
import ConfirmationPage from "@/features/patient/appointment/pages/confirmationPage";
import AppointmentConfirmedPage from "@/features/patient/appointment/pages/confirmed";
import AppointmentHistoryPage from "@/features/patient/appointment/pages/appointmentHistory.page";
import AppointmentSinglePage from "@/features/patient/appointment/pages/appointmentSinglePage";
import RescheduleConfirmPage from "@/features/patient/appointment/pages/rescheduleConfirmationPage";
import AppointmentRescheduleConfirmedPage from "@/features/patient/appointment/pages/reschudleConfirmed";

const PatientRoute = () => {
  return (
    <Routes>
      <Route element={<PublicPatientRoute />}>
        <Route path="/login" element={<LoginPatientPage />} />
        <Route
          path="/request-reset"
          element={<RequestResetPatientPasswordPage />}
        />
        <Route path="/reset-password" element={<ResetPatientPasswordPage />} />
        <Route path="/create-patient" element={<RegiesterPatientPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
      </Route>

      <Route element={<ProtectedPatientRoute />}>
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/doctors-list" element={<DoctorPageList />} />
        <Route
          path="/appointments/:doctorId"
          element={<AppointmentBookingPage />}
        />
        <Route
          path="/appointment/:doctorId/details"
          element={<ConfirmationPage />}
        />
        <Route
          path="/appointment/confirmed"
          element={<AppointmentConfirmedPage />}
        />
        <Route
          path="/appointment/RescheduleConfirmed"
          element={<AppointmentRescheduleConfirmedPage />}
        />
        <Route
          path="/appointment-history"
          element={<AppointmentHistoryPage />}
        />
        <Route
          path="/appointment/singlePage/:id"
          element={<AppointmentSinglePage />}
        />
        <Route
          path="/appointment/reschedule/:appointmentId/dates/:doctorId"
          element={<AppointmentBookingPage />}
        />
        <Route
          path="/appointment/:appointmentId/:doctorId/reschedule-details"
          element={<RescheduleConfirmPage />}
        />
      </Route>
    </Routes>
  );
};
export default PatientRoute;
