import "@/styles/doctor/doctorLogin.css";
import "@/styles/shared/loginAdminForm.css"
import LoginDoctorBanner from "../components/loginDoctorBanner";
import LoginDoctorForm from "../components/loginDoctorForm";

const LoginDoctorPage = () => {
  return (
    <main className="doctor-login-page">
      <div className="doctor-login-shell">
        <LoginDoctorBanner />
        <LoginDoctorForm />
      </div>
    </main>
  );
};

export default LoginDoctorPage;