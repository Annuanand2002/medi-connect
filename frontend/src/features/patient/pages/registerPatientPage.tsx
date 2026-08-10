import LoginDoctorBanner from "@/features/doctor/auth/components/loginDoctorBanner";
import PatientRegisterationForm from "../components/patientRegisteration.form";

const RegiesterPatientPage = () => {
  return (
    <div className="min-h-screen bg-[#EEF2F8]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] overflow-hidden bg-white shadow-2xl">
        <LoginDoctorBanner />
        <PatientRegisterationForm />
      </div>
    </div>
  );
};

export default RegiesterPatientPage;
