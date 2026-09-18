import axiosInstance from "@/services/axios";
import type {
  DoctorAppointmentResponse,
  GetDoctorAppointmentParams,
  SingleAppointmentDetails,
} from "../types/appointmentHistory";

export const getDoctorAppointment = async (
  params: GetDoctorAppointmentParams,
): Promise<DoctorAppointmentResponse> => {
  const response = await axiosInstance.get("/doctor/appointment", { params });
  return response.data.data;
};

//appointmentDetails 
export const getAppointmentDetails = async(id:string):Promise<SingleAppointmentDetails>=>{
  const response = await axiosInstance.get(`/doctor/appointment/${id}`)
  return response.data.data;
}
