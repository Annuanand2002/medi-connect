import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IGetDoctorAppointment } from "../../../domain/repositories/doctor/repo.usecase/IGetAppointment.Doctor";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";

@injectable()
export class DoctorAppointmentCOntroller {
  constructor(
    @inject(TYPES.GetAppointmentDoctorHistory)
    private _doctorApp: IGetDoctorAppointment,
  ) {}
  getAll = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("doctor unathorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || undefined;
    const dateString = req.query.date as string | undefined;
    let date: Date | undefined;
    if (dateString) {
      date = new Date(dateString);

      if (isNaN(date.getTime())) {
        throw new AppError("Invalid date", HTTP_STATUS.BAD_REQUEST);
      }
    }

    const result = await this._doctorApp.execute(doctorId, {
      page,
      limit,
      search,
      date,
    });
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });
}
