import LoginDoctorBanner from "@/features/doctor/auth/components/loginDoctorBanner";
import RequestResetPatientPasswordForm from "../components/reqResetPassword.Form";

const RequestResetPatientPasswordPage = () => {
  return (
    <div className="min-h-screen bg-[#EEF2F8]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] overflow-hidden bg-white shadow-2xl">
        <LoginDoctorBanner />
        <RequestResetPatientPasswordForm />
      </div>
    </div>
  );
};

export default RequestResetPatientPasswordPage;
