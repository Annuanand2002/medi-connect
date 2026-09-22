import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types/types";
import { IGetDatesForAppointmentUsecase } from "../../domain/repositories/patient/repo.usecase/IAppointmentDate";
import asyncHandler from "../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import {
  GetAppointmentDetailsDTO,
  GetAppointmentRescheduleDetails,
  PatientRequestDate,
} from "../../application/DTO/patient/appointment";
import HTTP_STATUS from "../../shared/constants/httpStatusCode";
import sendResponse from "../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../shared/constants/message";
import { IGetTimeSlotForAppointment } from "../../domain/repositories/patient/repo.usecase/IAppoinmentTimeSlot";
import AppError from "../../shared/errors/appErrors";
import { ICreateAppointmentUseCase } from "../../domain/repositories/patient/repo.usecase/ICreateAppointment.usecase";
import { IGetAppointmentDetailsUseCase } from "../../domain/repositories/patient/repo.usecase/IAppointmentConfrim";
import { IGetPatientAppointment } from "../../domain/repositories/patient/repo.usecase/IGetAppoitment.Patient.usecase";
import { AppointmentStatus } from "../../shared/constants/appointmentEnum";
import { IAppointmentDetails } from "../../domain/repositories/patient/repo.usecase/IAppointmentDetails";
import { IAppointmentCancel } from "../../domain/repositories/patient/repo.usecase/IAppoinymentCancel";
import { IAppointmentReschedule } from "../../domain/repositories/patient/repo.usecase/IAppointmentREschedule";
import { IGetDoctorAppointment } from "../../domain/repositories/doctor/repo.usecase/IGetAppointment.Doctor";
import { ISingleAppointmentDetails } from "../../domain/repositories/doctor/repo.usecase/IgetSingleAppointment.usecase";
import { IAppointmentDoctorReschedule } from "../../domain/repositories/doctor/repo.usecase/IAppointmentDoctorReschdule.usecase";
import { IGetRescheduleDetailsUseCase } from "../../domain/repositories/doctor/repo.usecase/IReschedukeConfirm.usecase";
import { DoctorGetAppointmentDetailsDTO } from "../../application/DTO/doctor/appointment";

@injectable()
export class AppointmentController {
  constructor(
    @inject(TYPES.GetDatesForAppointment)
    private _appointmentDate: IGetDatesForAppointmentUsecase,
    @inject(TYPES.GetTimeSlotUseCase)
    private _appointmentTime: IGetTimeSlotForAppointment,
    @inject(TYPES.CreateAppointmentUsecase)
    private _appointmentCreate: ICreateAppointmentUseCase,
    @inject(TYPES.GetAppointmentDetailsUseCase)
    private _appointmentDetails: IGetAppointmentDetailsUseCase,
    @inject(TYPES.GetAppointmentHistory)
    private _appointmentHistory: IGetPatientAppointment,
    @inject(TYPES.AppointmentDeatilsPage)
    private _appointmentDetailsPage: IAppointmentDetails,
    @inject(TYPES.AppointmentCancel)
    private _appointmentCancel: IAppointmentCancel,
    @inject(TYPES.AppointmentReschedule)
    private _appointmentResch: IAppointmentReschedule,
    @inject(TYPES.GetAppointmentDoctorHistory)
    private _doctorApp: IGetDoctorAppointment,
    @inject(TYPES.SingleAppointmenytDetails)
    private _appointDetails: ISingleAppointmentDetails,
    @inject(TYPES.AppointmentDoctorReschedule)
    private _rescheduleAppo: IAppointmentDoctorReschedule,
    @inject(TYPES.DoctorGetRescheduleDetailsUseCase)
    private _rescheduleDetails: IGetRescheduleDetailsUseCase,
  ) {}

  //patient

  // Dates
  getDates = asyncHandler(async (req: Request, res: Response) => {
    const doctorId = req.params.doctorId as string;
    const dto: PatientRequestDate = {
      doctorId,
      startDate: new Date(req.query.startDate as string),
      endDate: new Date(req.query.endDate as string),
    };
    const result = await this._appointmentDate.execute(dto);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  // TimeSlot
  getTimeSlot = asyncHandler(async (req: Request, res: Response) => {
    const doctorId = req.params.doctorId as string;
    const dateParam = req.query.date as string;
    if (!dateParam) {
      throw new AppError("Date is required", HTTP_STATUS.BAD_REQUEST);
    }

    const date = new Date(dateParam);
    const result = await this._appointmentTime.execute(doctorId, date);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  //details
  getAppointmentDetails = asyncHandler(async (req: Request, res: Response) => {
    const doctorId = req.params.doctorId as string;
    const { date, startTime, endTime } = req.query;

    if (!date || !startTime || !endTime) {
      throw new AppError(
        "Date, start time and end time are required",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const dto: GetAppointmentDetailsDTO = {
      doctorId,
      date: new Date(date as string),
      startTime: startTime as string,
      endTime: endTime as string,
    };

    const result = await this._appointmentDetails.execute(dto);

    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  //create
  create = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unathorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const patientId = req.user.id;
    const dto: GetAppointmentDetailsDTO = {
      doctorId: req.body.doctorId,
      date: new Date(req.body.date),
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    };
    const result = await this._appointmentCreate.execute(patientId, dto);
    res
      .status(HTTP_STATUS.CREATED)
      .json(sendResponse(RESPONSE_MESSAGES.CREATED, result));
  });

  //history
  getAppointmentHistory = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("patient unathorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const patientId = req.user.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || undefined;
    const status = (req.query.status as AppointmentStatus) || undefined;
    const result = await this._appointmentHistory.execute(patientId, {
      page,
      limit,
      search,
      status,
    });
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  //getSinglePge
  getAppointmentPage = asyncHandler(async (req: Request, res: Response) => {
    const appointmentId = req.params.appointmentId as string;
    const result = await this._appointmentDetailsPage.execute(appointmentId);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  //cancel
  cancel = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await this._appointmentCancel.execute(id);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, result));
  });

  //reschedule
  reschedule = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.appointmentId as string;
    const dto: GetAppointmentRescheduleDetails = {
      date: new Date(req.body.date),
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    };
    const result = await this._appointmentResch.execute(id, dto);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, result));
  });

  //doctor
  //all appointments
  doctorGetAll = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("doctor unathorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || undefined;
    const dateString = req.query.date as string | undefined;
    let date: Date | undefined;
    if (dateString) {
      date = new Date(dateString);

      if (isNaN(date.getTime())) {
        throw new AppError("Invalid date", HTTP_STATUS.BAD_REQUEST);
      }
    }
    const result = await this._doctorApp.execute(doctorId, {
      page,
      limit,
      search,
      date,
    });
    console.log("result", result);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  //details
  doctorGetDetails = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await this._appointDetails.execute(id);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  //getDates
  doctorGetDates = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const dto: PatientRequestDate = {
      doctorId,
      startDate: new Date(req.query.startDate as string),
      endDate: new Date(req.query.endDate as string),
    };
    const result = await this._appointmentDate.execute(dto);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });
  //getTimeslot
  doctorTimeSlot = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const dateParam = req.query.date as string;
    if (!dateParam) {
      throw new AppError("Date is required", HTTP_STATUS.BAD_REQUEST);
    }

    const date = new Date(dateParam);
    const result = await this._appointmentTime.execute(doctorId, date);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  //reschdule
  doctorReschedule = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const dto: GetAppointmentRescheduleDetails = {
      date: new Date(req.body.date),
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    };
    const response = await this._rescheduleAppo.execute(id, dto);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, response));
  });

  //details
  getDoctorAppointmentDetails = asyncHandler(
    async (req: Request, res: Response) => {
      const appointmentId = req.params.appointmentId as string;
      const { date, startTime, endTime } = req.query;

      if (!date || !startTime || !endTime) {
        throw new AppError(
          "Date, start time and end time are required",
          HTTP_STATUS.BAD_REQUEST,
        );
      }

      const dto: DoctorGetAppointmentDetailsDTO = {
        appointmentId,
        date: new Date(date as string),
        startTime: startTime as string,
        endTime: endTime as string,
      };

      const result = await this._rescheduleDetails.execute(dto);

      res
        .status(HTTP_STATUS.OK)
        .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
    },
  );
}
