import { injectable,inject } from "inversify";
import { IApproveDoctorRequestUsecase } from "../../../application/repository/doctor/IApproveDoctorRequestUsecase";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { TYPES } from "../../../di/types/types";

@injectable()
export default class ApproveDoctorRequestController {
  constructor(
    @inject(TYPES.ApproveDoctorRequestUsecase)
    private _approveDoctorRequestUsecase: IApproveDoctorRequestUsecase,
  ) {}
  handle = asyncHandler(async (req: Request, res: Response) => {
    const { doctorRequestId, departmentId } = req.body;
    await this._approveDoctorRequestUsecase.execeute({
      doctorRequestId,
      departmentId,
    });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Doctor request approved succesfully" });
  });
}
