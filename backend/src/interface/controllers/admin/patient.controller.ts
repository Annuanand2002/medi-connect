import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IGetAllPatientsUSeCase } from "../../../domain/repositories/patient/IGetAllpatients";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { PatientStatus } from "../../../shared/constants/role.status";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";
import { ITogglePatientUseCase } from "../../../domain/repositories/patient/repo.usecase/ITogglePatient";
import logger from "../../../shared/loggers/logger";

@injectable()
export class PatientController {
  constructor(
    @inject(TYPES.GetAllPatientUseCase)
    private _patient: IGetAllPatientsUSeCase,
    @inject(TYPES.TogglePatientUsecase)
    private _patientToggle: ITogglePatientUseCase,
  ) {}
  getAllPatient = asyncHandler(async (req: Request, res: Response) => {
    const search = req.query.search as string | undefined;
    const isBlocked = req.query.status as PatientStatus | undefined;
    const page = Number(req.query.page) | 1;
    const limit = Number(req.query.limit) | 10;
    const result = await this._patient.execute({
      page,
      limit,
      search,
      isBlocked,
    });
   //     logger.info(logger.info(`Get all pateint result: ${JSON.stringify(result, null, 2)}`))
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });
  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await this._patientToggle.execute(id);
            logger.info(logger.info(`Get details pateint result: ${JSON.stringify(result, null, 2)}`))

    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, result));
  });
}
