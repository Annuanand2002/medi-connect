import axiosInstance from "@/services/axios";
import type {
  DoctorAppointmentResponse,
  GetDoctorAppointmentParams,
  SingleAppointmentDetails,
} from "../types/appointmentHistory";
import type { DoctorRequestDate, GetDoctorDatesResponse } from "../types/appointmentDate";
import type { DoctorAvailableTimeSlot } from "../types/appointmentTime";
import type { DcotorAppointmentDetails } from "../types/appointmentConfirm";
import type { ReschudelRequest } from "@/features/patient/appointment/type/appointmentSinglePage";
import type { SingleDoctorAppointmentDetails } from "../types/singleAppointmentDetails";
import { ROUTES } from "@/constants/route";

export const getDoctorAppointment = async (
  params: GetDoctorAppointmentParams,
): Promise<DoctorAppointmentResponse> => {
  const response = await axiosInstance.get(ROUTES.DOCTOR.APPOINTMENT.GET, { params });
  return response.data.data;
};

//appointmentDetails 
export const getAppointmentDetails = async(id:string):Promise<SingleAppointmentDetails>=>{
  const response = await axiosInstance.get(`${ROUTES.DOCTOR.APPOINTMENT.GET}/${id}`)
  return response.data.data;
}


//rescehedule available dates

export const getDoctorRescheduleAvailableDates = async (
  appointmentId: string,
  params: DoctorRequestDate,
): Promise<GetDoctorDatesResponse> => {
  const response = await axiosInstance.get<GetDoctorDatesResponse>(
    `${ROUTES.DOCTOR.APPOINTMENT.GET}/${appointmentId}${ROUTES.DOCTOR.APPOINTMENT.RESCHEDULE.DATE}`,
    {
      params: {
        startDate: params.startDate,
        endDate: params.endDate,
      },
    },
  );
  return response.data;
};

//rschdelw tume-slot
export const getDoctorRescheduleTimeSlotsApi = async (
  date: string,
): Promise<DoctorAvailableTimeSlot[]> => {
  const response = await axiosInstance.get(
    `${ROUTES.DOCTOR.APPOINTMENT.RESCHEDULE.TIMESLOT}?date=${date}`,
  );
console.log(response.data.data)
  return response.data.data;
};

//reschdeule confirm
export const getDoctorRescheduleAppointmentDetailsApi = async (
  appointmentId: string,
  date: string,
  startTime: string,
  endTime: string,
): Promise<DcotorAppointmentDetails> => {
   console.log("appointmentid njn ane",appointmentId)
  const response = await axiosInstance.get(
   
    `${ROUTES.DOCTOR.APPOINTMENT.RESCHEDULE.UPDATE}/${appointmentId}`,
    {
      params: {
        date,
        startTime,
        endTime,
      },
    },
  );

  return response.data.data;
};
export const reschedule = async (
  appointmentId: string,
  data: ReschudelRequest,
): Promise<SingleDoctorAppointmentDetails> => {
  const response = await axiosInstance.patch(
    `${ROUTES.DOCTOR.APPOINTMENT.RESCHEDULE.UPDATE}/${appointmentId}`,
    data,
  );
  return response.data.data;
};