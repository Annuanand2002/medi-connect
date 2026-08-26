import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IGetDatesForAppointmentUsecase } from "../../../domain/repositories/patient/repo.usecase/IAppointmentDate";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import {
  GetAppointmentDetailsDTO,
  PatientRequestDate,
} from "../../../application/DTO/patient/appointment";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";
import { IGetTimeSlotForAppointment } from "../../../domain/repositories/patient/repo.usecase/IAppoinmentTimeSlot";
import AppError from "../../../shared/errors/appErrors";
import { ICreateAppointmentUseCase } from "../../../domain/repositories/patient/repo.usecase/ICreateAppointment.usecase";
import { IGetAppointmentDetailsUseCase } from "../../../domain/repositories/patient/repo.usecase/IAppointmentConfrim";
import { IGetPatientAppointment } from "../../../domain/repositories/patient/repo.usecase/IGetAppoitment.Patient.usecase";
import { AppointmentStatus } from "../../../shared/constants/appointmentEnum";

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
  ) {}
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
  getAppointmentHistory = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("patient unathorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const patientId = req.user.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string || undefined;
    const status = req.query.status as AppointmentStatus || undefined;
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
}
