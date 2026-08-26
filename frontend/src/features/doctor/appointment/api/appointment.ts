import axiosInstance from "@/services/axios";
import type {
  DoctorAppointmentResponse,
  GetDoctorAppointmentParams,
} from "../types/appointmentHistory";

export const getDoctorAppointment = async (
  params: GetDoctorAppointmentParams,
): Promise<DoctorAppointmentResponse> => {
  const response = await axiosInstance.get("/doctor/appointment", { params });
  return response.data.data;
};
