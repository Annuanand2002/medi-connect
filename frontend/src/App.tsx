import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./features/admin/auth/pages/login";
import ProtectedRoute from "./features/admin/auth/components/ProtectedRoute";
import DashboardPage from "./pages/admin/Dashboard";
import PublicRoute from "./features/admin/auth/components/PublicRoute";
import DoctorRequestPage from "./pages/doctor/doctorRequestFrorm.page";
import DoctorRequestsPageList from "./pages/admin/doctorRequestList";
import DoctorRequestDetailsPage from "./pages/admin/doctorRequestDetailsPage";
import SetPasswordPage from "./pages/doctor/SetPasswordPage";
import DoctorLogin from "./pages/doctor/DcotorLogin";
import RetryDoctorPage from "./pages/doctor/RetryDoctorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/admin/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route
            path="/admin/doctor-request"
            element={<DoctorRequestsPageList />}
          />
          <Route
            path="/admin/doctor-request/:id"
            element={<DoctorRequestDetailsPage />}
          />
        </Route>
        <Route path="/doctor/apply" element={<DoctorRequestPage />} />
        <Route path="/doctor/setup-password" element={<SetPasswordPage />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/retry" element={<RetryDoctorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
