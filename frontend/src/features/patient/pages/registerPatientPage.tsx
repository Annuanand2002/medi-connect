import PatientRegisterationForm from "../components/patientRegisteration.form";

import "@/styles/patient/patientRegistration.css";
import LoginPatientBanner from "../auth/components/loginPatientBanner";

const RegiesterPatientPage = () => {
  return (
    <main className="patient-registration-page">
      <section className="patient-registration-shell">
        <LoginPatientBanner />

        <section className="patient-registration-panel">
          <div className="patient-registration-container">
            <header className="patient-registration-header">
              <span className="patient-registration-label">
                PATIENT REGISTRATION
              </span>

              <h1>Create your account.</h1>

              <p>
                Join MediConnect to manage appointments and access your care
                in one secure place.
              </p>
            </header>

            <PatientRegisterationForm />
          </div>
        </section>
      </section>
    </main>
  );
};

export default RegiesterPatientPage;