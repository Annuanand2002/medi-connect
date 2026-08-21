import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { ICreateDoctorAvailUseCase } from "../../../domain/repositories/doctor/repo.usecase/IDoctorAvaulabilityCreate.usecase";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { CreateDoctorAvailabilityDTO } from "../../../application/DTO/doctor/doctorAvailbilty";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";
import AppError from "../../../shared/errors/appErrors";
import { IUpdateDoctorAvailabilityUseCase } from "../../../domain/repositories/doctor/repo.usecase/IUpdateDoctorAvail.usecase";
import { IDeleteDoctorAvailUsecase } from "../../../domain/repositories/doctor/repo.usecase/IDeleteDotcorAvail.usecase";
import { IGetDoctorAvailUsecase } from "../../../domain/repositories/doctor/repo.usecase/IGetDoctorAvailability";

@injectable()
export class DoctorAvailController {
  constructor(
    @inject(TYPES.CreateDoctorAvailUseCase)
    private _doctorAvilUseCase: ICreateDoctorAvailUseCase,
    @inject(TYPES.UpdateDoctorAvailabilityUseCase)
    private _doctorUpdateAvil: IUpdateDoctorAvailabilityUseCase,
    @inject(TYPES.DeleteDoctorAvailUsecase)
    private _doctorDelRepo: IDeleteDoctorAvailUsecase,
    @inject(TYPES.GetDoctorAvailUsecase)
    private _getDoctorAvail: IGetDoctorAvailUsecase,
  ) {}
  create = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unathorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const { dayOfWeek, startTime, endTime, breaks, duration, isAvailable } =
      req.body;
    const data: CreateDoctorAvailabilityDTO = {
      doctorId,
      dayOfWeek,
      startTime,
      endTime,
      breaks,
      duration,
      isAvailable,
    };
    const availability = await this._doctorAvilUseCase.exceute(data);
    res
      .status(HTTP_STATUS.CREATED)
      .json(sendResponse(RESPONSE_MESSAGES.CREATED, availability));
  });
  update = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const dto: CreateDoctorAvailabilityDTO = {
      doctorId: req.body.doctorId,
      dayOfWeek: req.body.dayOfWeek,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      breaks: req.body.breaks,
      isAvailable: req.body.isAvailable,
      duration: req.body.duration,
    };
    const update = await this._doctorUpdateAvil.execute(id, dto);
    console.log("update",update)
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, update));
  });
  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const deleted = await this._doctorDelRepo.execute(id);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.DELETED, deleted));
  });
  getAvailability = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unathoirzed", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const doctors = await this._getDoctorAvail.execute(doctorId);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, doctors));
  });
}
