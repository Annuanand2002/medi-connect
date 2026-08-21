import { injectable, inject } from "inversify";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { TYPES } from "../../../di/types/types";
import { IApproveDoctorRequestUsecase } from "../../../domain/repositories/doctor/repo.usecase/IApproveDoctorRequestUsecase";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";

@injectable()
export default class ApproveDoctorRequestController {
  constructor(
    @inject(TYPES.ApproveDoctorRequestUsecase)
    private _approveDoctorRequestUsecase: IApproveDoctorRequestUsecase,
  ) {}
  handle = asyncHandler(async (req: Request, res: Response) => {
    const { doctorRequestId} = req.body;
    await this._approveDoctorRequestUsecase.execeute({
      doctorRequestId,
    });
    res.status(HTTP_STATUS.OK).json(sendResponse(RESPONSE_MESSAGES.CREATED));
  });
}
