import "@/styles/admin/requestForgetPassword.css";

import LoginDoctorBanner from "../auth/components/loginDoctorBanner";
import RequestResetPasswordForm from "../components/RequestResetPasswordForm";

const RequestResetPasswordPage = () => {
  return (
    <main className="doctor-login-page">
      <div className="doctor-login-shell">
        <LoginDoctorBanner />
        <RequestResetPasswordForm />
      </div>
    </main>
  );
};

export default RequestResetPasswordPage;
