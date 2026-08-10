import LoginPatientBanner from "../components/loginPatientBanner";
import LoginPatientForm from "../components/loginPatientForm";

import "@/styles/patient/patientLogin.css";

const LoginPatientPage = () => {
  return (
    <main className="patient-login-page">
      <section className="patient-login-shell">
        <LoginPatientBanner />
        <LoginPatientForm />
      </section>
    </main>
  );
};

export default LoginPatientPage;
