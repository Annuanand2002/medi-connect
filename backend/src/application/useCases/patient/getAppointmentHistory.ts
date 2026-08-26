import { inject, injectable } from "inversify";
import { IGetPatientAppointment } from "../../../domain/repositories/patient/repo.usecase/IGetAppoitment.Patient.usecase";
import { TYPES } from "../../../di/types/types";
import {
  GetAppointmentReqDTO,
  PaginationAppointmenttResDTO,
} from "../../DTO/patient/getAppointmentRepo";
import { IAppointmentRepo } from "../../../domain/repositories/patient/IAppointmentRepo";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class GetAppointmentHistory implements IGetPatientAppointment {
  constructor(
    @inject(TYPES.AppoitmentRepo)
    private _doctorApp: IAppointmentRepo,
  ) {}

  async execute(
    patientId: string,
    dto: GetAppointmentReqDTO,
  ): Promise<PaginationAppointmenttResDTO> {
    if (!patientId) {
      throw new AppError("patient is unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    return await this._doctorApp.findPatientAppointment(patientId, dto);
  }
}
