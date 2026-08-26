import axiosInstance from "@/services/axios";
import type {
  GetDoctorsParams,
  GetDoctorsResponse,
} from "../type/getDoctorList";
import type {
  GetDatesResponse,
  PatientRequestDate,
} from "../type/appointmentDate";
import type { AvailableTimeSlot } from "../type/appointmentTime";
import type { AppointmentDetails } from "../type/appointmentConfirm";
import type {
  CreateAppointmentRequest,
  CreatedAppointment,
} from "../type/createAppointment.type";
import type {
  GetPatientAppointmentParams,
  PatientAppointmentResponse,
} from "../type/appointmentList";

//doctorList
export const getPatientDoctors = async (
  params: GetDoctorsParams,
): Promise<GetDoctorsResponse> => {
  const response = await axiosInstance.get<GetDoctorsResponse>(
    "/patient/doctors",
    {
      params,
    },
  );
  return response.data;
};

//availble dates
export const getAvailableDates = async (
  params: PatientRequestDate,
): Promise<GetDatesResponse> => {
  const response = await axiosInstance.get<GetDatesResponse>(
    `/patient/dates/${params.doctorId}`,
    {
      params: {
        startDate: params.startDate,
        endDate: params.endDate,
      },
    },
  );

  return response.data;
};

//availble slots
export const getTimeSlotsApi = async (
  doctorId: string,
  date: string,
): Promise<AvailableTimeSlot[]> => {
  const response = await axiosInstance.get(
    `/patient/timeslots/${doctorId}?date=${date}`,
  );

  return response.data.data;
};

//confirm
export const getAppointmentDetailsApi = async (
  doctorId: string,
  date: string,
  startTime: string,
  endTime: string,
): Promise<AppointmentDetails> => {
  const response = await axiosInstance.get(
    `/patient/appointment/${doctorId}/details`,
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

//create
export const createAppointmentApi = async (
  data: CreateAppointmentRequest,
): Promise<CreatedAppointment> => {
  const response = await axiosInstance.post(
    "/patient/appointment/create",
    data,
  );

  return response.data.data;
};

//getAll
export const getAppointmentHistory = async (
  params: GetPatientAppointmentParams,
): Promise<PatientAppointmentResponse> => {
  const response = await axiosInstance.get("/patient/appointment", {
    params,
  });

  return response.data.data;
};
