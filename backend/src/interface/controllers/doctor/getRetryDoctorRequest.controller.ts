import { IGetDoctorRetryRequest } from "../../../application/repository/doctor/IGetDoctorRetryReq.usecase";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";

export class GetRetryDoctorRequestController {
  constructor(private getRetryDoctorRequest: IGetDoctorRetryRequest) {}
  handle = asyncHandler(async (req: Request, res: Response) => {
    const token = req.query.token as string;
    const doctorRequest = await this.getRetryDoctorRequest.execute(token);
    res
      .status(HTTP_STATUS.OK)
      .json({
        success: true,
        message: "Request fetcehd succesfully",
        result: doctorRequest,
      });
  });
}
