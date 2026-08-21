import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { ICreateDoctorLeaveUsecase } from "../../../domain/repositories/doctor/repo.usecase/ICreateDoctorLeave.usecase";
import { IUpdateDoctorLeaveUseCase } from "../../../domain/repositories/doctor/repo.usecase/IUpdateDoctorLeave";
import { IDeleteDoctorLeaveUsecase } from "../../../domain/repositories/doctor/repo.usecase/IDeleteDoctorLeave.usecase";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";
import { IGetDoctorLeaveUseCase } from "../../../domain/repositories/doctor/repo.usecase/IGetAllDoctorLeave.usecase";
import AppError from "../../../shared/errors/appErrors";

@injectable()
export class DoctorLeaveController {
  constructor(
    @inject(TYPES.CreateDoctorLeave)
    private _createLeave: ICreateDoctorLeaveUsecase,
    @inject(TYPES.UpdateDoctorLeave)
    private _updateLeave: IUpdateDoctorLeaveUseCase,
    @inject(TYPES.DeleteDoctorLeaveusecase)
    private _deleteLeave: IDeleteDoctorLeaveUsecase,
    @inject(TYPES.GetAllDoctorLeaveUsecase)
    private _getLeave: IGetDoctorLeaveUseCase,
  ) {}
  create = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const data = {
      doctorId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reason: req.body.reason,
    };
    const result = await this._createLeave.execute(data);
    res
      .status(HTTP_STATUS.CREATED)
      .json(sendResponse(RESPONSE_MESSAGES.CREATED, result));
  });
  update = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    if (!req.user) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }

    const doctorId = req.user.id;
    const data = {
      doctorId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reason: req.body.reason,
    };
    const result = await this._updateLeave.execute(id, data);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, result));
  });
  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await this._deleteLeave.execute(id);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.DELETED, result));
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }

    const doctorId = req.user.id;

    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const date =
      typeof req.query.date === "string" ? req.query.date : undefined;

    const page =
      typeof req.query.page === "string" ? Number(req.query.page) : 1;

    const limit =
      typeof req.query.limit === "string" ? Number(req.query.limit) : 10;

    const result = await this._getLeave.execute({
      doctorId,
      search,
      date,
      page,
      limit,
    });

    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });
}
