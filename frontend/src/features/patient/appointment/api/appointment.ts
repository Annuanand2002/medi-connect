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
import type {
  AppointmentSinglePage,
  ReschudelRequest,
} from "../type/appointmentSinglePage";
import { ROUTES } from "@/constants/route";

//doctorList
export const getPatientDoctors = async (
  params: GetDoctorsParams,
): Promise<GetDoctorsResponse> => {
  const response = await axiosInstance.get<GetDoctorsResponse>(
    ROUTES.PATIENT.APPOINTMENT.GET,
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
    `${ROUTES.PATIENT.APPOINTMENT.DATES}/${params.doctorId}`,
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
    `${ROUTES.PATIENT.APPOINTMENT.TIMESLOT}/${doctorId}?date=${date}`,
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
    `${ROUTES.PATIENT.APPOINTMENT.DETAILS}/${doctorId}/details`,
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
    ROUTES.PATIENT.APPOINTMENT.CREATE,
    data,
  );

  return response.data.data;
};

//getAll
export const getAppointmentHistory = async (
  params: GetPatientAppointmentParams,
): Promise<PatientAppointmentResponse> => {
  const response = await axiosInstance.get(ROUTES.PATIENT.APPOINTMENT.DETAILS, {
    params,
  });

  return response.data.data;
};

//singlePage
export const singleAppointmentPage = async (
  appointmentId: string,
): Promise<AppointmentSinglePage> => {
  const response = await axiosInstance.get(
    `${ROUTES.PATIENT.APPOINTMENT.DETAILS}/${appointmentId}`,
  );
  return response.data.data;
};

//cancel
export const cancelAppointment = async (
  id: string,
): Promise<AppointmentSinglePage> => {
  const response = await axiosInstance.patch(
    `${ROUTES.PATIENT.APPOINTMENT.CANCEL}/${id}`,
  );
  return response.data.data;
};

//rescehedule available dates

export const getRescheduleAvailableDates = async (
  appointmentId: string,
  params: PatientRequestDate,
): Promise<GetDatesResponse> => {
  const response = await axiosInstance.get<GetDatesResponse>(
    `${ROUTES.PATIENT.APPOINTMENT.DETAILS}/${appointmentId}/${ROUTES.PATIENT.APPOINTMENT.RESCHEDULE.DATE}/${params.doctorId}`,
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
export const getRescheduleTimeSlotsApi = async (
  doctorId: string,
  date: string,
): Promise<AvailableTimeSlot[]> => {
  const response = await axiosInstance.get(
    `${ROUTES.PATIENT.APPOINTMENT.RESCHEDULE.TIMESLOT}/${doctorId}?date=${date}`,
  );

  return response.data.data;
};

//reschdeule confirm
export const getRescheduleAppointmentDetailsApi = async (
  appointmentId: string,
  doctorId: string,
  date: string,
  startTime: string,
  endTime: string,
): Promise<AppointmentDetails> => {
  const response = await axiosInstance.get(
    `${ROUTES.PATIENT.APPOINTMENT.RESCHEDULE.GET}/${appointmentId}/${doctorId}`,
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
): Promise<AppointmentSinglePage> => {
  const response = await axiosInstance.patch(
    `${ROUTES.PATIENT.APPOINTMENT.RESCHEDULE.CONFIRM}/${appointmentId}`,
    data,
  );
  return response.data.data;
};
