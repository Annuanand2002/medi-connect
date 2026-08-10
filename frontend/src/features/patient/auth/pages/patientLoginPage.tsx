import LoginPatientBanner from "../components/loginPatientBanner";
import LoginPatientForm from "../components/loginPatientForm";
import "@/styles/admin/adminLogin.css";

const LoginPatientPage = () => {
  return (
    <div className="min-h-screen bg-[#EEF2F8]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] overflow-hidden bg-white shadow-2xl">
        <LoginPatientBanner />
        <LoginPatientForm />
      </div>
    </div>
  );
};

export default LoginPatientPage;
