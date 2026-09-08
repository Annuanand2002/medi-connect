import { injectable, inject } from "inversify";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { TYPES } from "../../../di/types/types";
import { IApproveDoctorRequestUsecase } from "../../../domain/repositories/doctor/repo.usecase/IApproveDoctorRequestUsecase";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";
import { IRejectDoctorRequestUseCase } from "../../../domain/repositories/doctor/repo.usecase/IRejectDoctorRequest.usecase";

@injectable()
export default class ActionDoctorRequestController {
  constructor(
    @inject(TYPES.ApproveDoctorRequestUsecase)
    private _approveDoctorRequestUsecase: IApproveDoctorRequestUsecase,
     @inject(TYPES.RejectdoctorRequestUseCase)
        private _rejectReqesUseCase: IRejectDoctorRequestUseCase,
  ) {}

  //aprove
  approve = asyncHandler(async (req: Request, res: Response) => {
    const { doctorRequestId} = req.body;
    await this._approveDoctorRequestUsecase.execeute({
      doctorRequestId,
    });
    res.status(HTTP_STATUS.OK).json(sendResponse(RESPONSE_MESSAGES.CREATED));
  });

  //reject
  reject = asyncHandler(async (req: Request, res: Response) => {
    const id = req.query.id as string;
    const { rejectReason } = req.body;
    await this._rejectReqesUseCase.execute({
      doctorRequestId: id,
      rejectReason,
    });
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.REJECT));
  });
}
