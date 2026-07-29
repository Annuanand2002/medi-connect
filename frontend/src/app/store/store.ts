import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/admin/auth/redux/authSlice";
import doctorRequestReducer from "@/features/doctor/redux/doctorRequest.slice";
import doctorRequestListReducer from "@/features/admin/redux/doctorRequestList.slice";
import doctorRequestDetailsReducer from "@/features/admin/redux/doctorRequestDetailsPage.slice";
import departmentReducer from "@/features/admin/redux/department.slice";
import retryDoctorReducer from "@/features/doctor/redux/retryDoctor.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctorRequest: doctorRequestReducer,
    doctorRequestList: doctorRequestListReducer,
    doctorRequestDetails: doctorRequestDetailsReducer,
    department: departmentReducer,
    retryDoctor: retryDoctorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
