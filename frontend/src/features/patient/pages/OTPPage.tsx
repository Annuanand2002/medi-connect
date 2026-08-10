import LoginDoctorBanner from "@/features/doctor/auth/components/loginDoctorBanner"
import PatientOtp from "../components/patientOTP"

const VerifyOTPPage = ()=>{
    return(
        <>
         <div className="min-h-screen bg-[#EEF2F8]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] overflow-hidden bg-white shadow-2xl">
        <LoginDoctorBanner/>
        < PatientOtp/>
      </div>
    </div>
        </>
    )
}

export default VerifyOTPPage