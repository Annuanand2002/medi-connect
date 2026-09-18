import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IGetDoctorAppointment } from "../../../domain/repositories/doctor/repo.usecase/IGetAppointment.Doctor";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";
import { ISingleAppointmentDetails } from "../../../domain/repositories/doctor/repo.usecase/IgetSingleAppointment.usecase";
import { IAppointmentDoctorReschedule } from "../../../domain/repositories/doctor/repo.usecase/IAppointmentDoctorReschdule.usecase";
import {
  GetAppointmentRescheduleDetails,
  PatientRequestDate,
} from "../../../application/DTO/patient/appointment";
import { IGetDatesForAppointmentUsecase } from "../../../domain/repositories/patient/repo.usecase/IAppointmentDate";
import { IGetTimeSlotForAppointment } from "../../../domain/repositories/patient/repo.usecase/IAppoinmentTimeSlot";

@injectable()
export class DoctorAppointmentCOntroller {
  constructor(
    @inject(TYPES.GetAppointmentDoctorHistory)
    private _doctorApp: IGetDoctorAppointment,
    @inject(TYPES.SingleAppointmenytDetails)
    private _appointDetails: ISingleAppointmentDetails,
    @inject(TYPES.AppointmentDoctorReschedule)
    private _rescheduleAppo: IAppointmentDoctorReschedule,
    @inject(TYPES.GetDatesForAppointment)
    private _appointmentDate: IGetDatesForAppointmentUsecase,
    @inject(TYPES.GetTimeSlotUseCase)
    private _appointmentTime: IGetTimeSlotForAppointment,
  ) {}
  getAll = asyncHandler(async (req: Request, res: Response) => {
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
  getDetails = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await this._appointDetails.execute(id);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  //getDates
  getDates = asyncHandler(async (req: Request, res: Response) => {
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
  getTimeSlot = asyncHandler(async (req: Request, res: Response) => {
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
  reschedule = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const dto: GetAppointmentRescheduleDetails = {
      date: new Date(req.body.date),
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    };
    const response = await this._rescheduleAppo.execute(id, dto);
    res.status(HTTP_STATUS.OK).json(sendResponse(RESPONSE_MESSAGES.UPDATED));
  });
}
