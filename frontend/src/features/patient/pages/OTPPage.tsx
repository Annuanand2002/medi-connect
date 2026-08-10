import PatientOtp from "../components/patientOTP";
import "@/styles/patient/patientOtp.css";
import LoginPatientBanner from "../auth/components/loginPatientBanner";

const VerifyOTPPage = () => {
  return (
    <main className="patient-otp-page">
      <section className="patient-otp-shell">
        <LoginPatientBanner />

        <section className="patient-otp-panel">
          <PatientOtp />
        </section>
      </section>
    </main>
  );
};

export default VerifyOTPPage;