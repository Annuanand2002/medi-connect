import { IRejectDoctorRequestUseCase } from "../../../application/useCases/doctor/IRejectDoctorRequest.usecase";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";

export class RejectDoctorRequestController {
  constructor(private rejectReqesUseCase: IRejectDoctorRequestUseCase) {}
  handle = asyncHandler(async (req: Request, res: Response) => {
    const id = req.query.id as string;
    const { rejectReason } = req.body;
    await this.rejectReqesUseCase.execute({
      doctorRequestId: id,
      rejectReason,
    });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Doctor requedst rejecetd" });
  });
}
