import RequestResetPatientPasswordForm from "../components/reqResetPassword.Form";

import "@/styles/patient/patientRequestReset.css";
import LoginPatientBanner from "../auth/components/loginPatientBanner";

const RequestResetPatientPasswordPage = () => {
  return (
    <main className="patient-reset-page">
      <section className="patient-reset-shell">
        <LoginPatientBanner />
        <RequestResetPatientPasswordForm />
      </section>
    </main>
  );
};

export default RequestResetPatientPasswordPage;