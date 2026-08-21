import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { ICreateDoctorBlockUseCase } from "../../../domain/repositories/doctor/repo.usecase/ICreateDoctorBlock";
import { IUpdateDoctorBlockUsecase } from "../../../domain/repositories/doctor/repo.usecase/IUpdateDoctor.usecae";
import { IDeleteDoctorBlockUseCase } from "../../../domain/repositories/doctor/repo.usecase/IDeleteDoctor.usecase";
import { IGetDoctorBlockusecase } from "../../../domain/repositories/doctor/repo.usecase/IGetDotcorBlock.usecase";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";

@injectable()
export class DoctorBlockController {
  constructor(
    @inject(TYPES.CreateDoctorBlockUseCase)
    private _createBlock: ICreateDoctorBlockUseCase,
    @inject(TYPES.UpdateDoctorBlockUsecase)
    private _updateBlock: IUpdateDoctorBlockUsecase,
    @inject(TYPES.DeleteDoctorBlockUsecase)
    private _deletBlock: IDeleteDoctorBlockUseCase,
    @inject(TYPES.GetDoctorBlockUsecase)
    private _getBlock: IGetDoctorBlockusecase,
  ) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const data = {
      doctorId,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      reason: req.body.reason,
    };
    const result = await this._createBlock.execute(data);
    res
      .status(HTTP_STATUS.CREATED)
      .json(sendResponse(RESPONSE_MESSAGES.CREATED, result));
  });
  update = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const id = req.params.id as string;
    const data = {
      doctorId,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      reason: req.body.reason,
    };
    const result = await this._updateBlock.execute(id, data);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, result));
  });
  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await this._deletBlock.execute(id);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.DELETED, result));
  });
  getAll = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unathorized", HTTP_STATUS.UNAUTHORIZED);
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
    const result = await this._getBlock.execute({
      doctorId,
      page,
      search,
      date,
      limit,
    });
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });
}
