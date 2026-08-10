import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/admin/auth/redux/authSlice";
import doctorRequestReducer from "@/features/doctor/redux/doctorRequest.slice";
import doctorRequestListReducer from "@/features/admin/redux/doctorRequestList.slice";
import doctorRequestDetailsReducer from "@/features/admin/redux/doctorRequestDetailsPage.slice";
import departmentReducer from "@/features/admin/redux/department.slice";
import retryDoctorReducer from "@/features/doctor/redux/retryDoctor.slice";
import authDoctorReducer from '@/features/doctor/auth/redux/authDoctor.slice';
import authPatientReducer from '@/features/patient/auth/redux/patient.auth.slice';
import registerPatientReducer from '@/features/patient/auth/redux/register.patient.Slice';
import patientOtpReducer from "@/features/patient/redux/verifyOTP.slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctorRequest: doctorRequestReducer,
    doctorRequestList: doctorRequestListReducer,
    doctorRequestDetails: doctorRequestDetailsReducer,
    department: departmentReducer,
    retryDoctor: retryDoctorReducer,
    authDoctor : authDoctorReducer,
    authPatient : authPatientReducer,
    registerPatient : registerPatientReducer,
    patientOtp : patientOtpReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
