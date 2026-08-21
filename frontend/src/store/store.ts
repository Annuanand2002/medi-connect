import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/admin/auth/redux/authSlice";
import doctorRequestReducer from "@/features/doctor/redux/doctorRequest.slice";
import doctorRequestListReducer from "@/features/admin/redux/doctorRequestList.slice";
import doctorRequestDetailsReducer from "@/features/admin/redux/doctorRequestDetailsPage.slice";
import retryDoctorReducer from "@/features/doctor/redux/retryDoctor.slice";
import authDoctorReducer from "@/features/doctor/auth/redux/authDoctor.slice";
import authPatientReducer from "@/features/patient/auth/redux/patient.auth.slice";
import registerPatientReducer from "@/features/patient/auth/redux/register.patient.Slice";
import patientOtpReducer from "@/features/patient/redux/verifyOTP.slice";
import doctorListReducer from "@/features/admin/redux/doctorList.slice";
import patientListReducer from "@/features/admin/redux/patientListSlice";
import doctorAvailabilityListReducer from "@/features/doctor/Mange-availability/redux/getAvail.slice";
import doctorLeaveReducer from "@/features/doctor/manage-leave/redux/doctorLeave.slice";
import doctorBlockReducer from "@/features/doctor/manage-block/redux/doctorBlock.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctorRequest: doctorRequestReducer,
    doctorRequestList: doctorRequestListReducer,
    doctorRequestDetails: doctorRequestDetailsReducer,
    retryDoctor: retryDoctorReducer,
    authDoctor: authDoctorReducer,
    authPatient: authPatientReducer,
    registerPatient: registerPatientReducer,
    patientOtp: patientOtpReducer,
    doctorList: doctorListReducer,
    patientList: patientListReducer,
    availability: doctorAvailabilityListReducer,
    doctorLeave: doctorLeaveReducer,
    doctorBlock: doctorBlockReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
