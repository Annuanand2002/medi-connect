import { IApproveDoctorRequestUsecase } from "../../../application/useCases/doctor/IApproveDoctorRequestUsecase";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";

export default class ApproveDoctorRequestController {
  constructor(
    private approveDoctorRequestUsecase: IApproveDoctorRequestUsecase,
  ) {}
  handle = asyncHandler(async (req: Request, res: Response) => {
    console.log("approve controller")
    const { doctorRequestId, departmentId } = req.body;
    await this.approveDoctorRequestUsecase.execeute({
      doctorRequestId,
      departmentId,
    });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Doctor request approved succesfully" });
  });
}
