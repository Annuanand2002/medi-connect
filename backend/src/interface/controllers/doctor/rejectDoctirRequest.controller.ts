import { inject, injectable } from "inversify";
import { IRejectDoctorRequestUseCase } from "../../../application/repository/doctor/IRejectDoctorRequest.usecase";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { TYPES } from "../../../di/types/types";

@injectable()
export class RejectDoctorRequestController {
  constructor(
    @inject(TYPES.RejectdoctorRequestUseCase)
    private _rejectReqesUseCase: IRejectDoctorRequestUseCase,
  ) {}
  handle = asyncHandler(async (req: Request, res: Response) => {
    const id = req.query.id as string;
    const { rejectReason } = req.body;
    await this._rejectReqesUseCase.execute({
      doctorRequestId: id,
      rejectReason,
    });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Doctor requedst rejecetd" });
  });
}
