import { inject, injectable } from "inversify";
import { IGetDoctorAppointment } from "../../../domain/repositories/doctor/repo.usecase/IGetAppointment.Doctor";
import { TYPES } from "../../../di/types/types";
import { IAppointmentRepo } from "../../../domain/repositories/patient/IAppointmentRepo";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { GetDoctorAppointmentReqDTO, PaginationDoctorAppointmenttResDTO } from "../../DTO/doctor/appointment";

@injectable()
export class GetAppointmentDoctorHistory implements IGetDoctorAppointment {
  constructor(
    @inject(TYPES.AppoitmentRepo)
    private _appointment: IAppointmentRepo,
  ) {}
  async execute(
    doctorId: string,
    dto: GetDoctorAppointmentReqDTO,
  ): Promise<PaginationDoctorAppointmenttResDTO> {
    if (!doctorId) {
      throw new AppError("doctor unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    return await this._appointment.findDoctorAppointment(doctorId, dto);
  }
}
