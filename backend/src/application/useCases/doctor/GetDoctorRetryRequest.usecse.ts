import { injectable, inject } from "inversify";
import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import { IDoctorRetryTokenRepo } from "../../../domain/repositories/doctor/IDoctorRetry.repo";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { IGetDoctorRetryRequest } from "../../repository/doctor/IGetDoctorRetryReq.usecase";
import { TYPES } from "../../../di/types/types";

@injectable()
export class GetDoctorRetryRequest implements IGetDoctorRetryRequest {
  constructor(
    @inject(TYPES.DoctorRequestRepository)
    private _doctorRequestRepo: IDoctorRequest,
    @inject(TYPES.DoctorRetryTokenRepository)
    private _getDoctorRetry: IDoctorRetryTokenRepo,
  ) {}
  async execute(token: string): Promise<DoctorRequest> {
    const retryToken = await this._getDoctorRetry.findByToken(token);
    if (!retryToken) {
      throw new AppError("Invalid retryb token", HTTP_STATUS.BAD_REQUEST);
    }
    if (retryToken.expiresAt < new Date()) {
      throw new AppError("Token expires", HTTP_STATUS.BAD_REQUEST);
    }
    const doctorRetryRequest = await this._doctorRequestRepo.findById(
      retryToken.doctorRequestId,
    );
    if (!doctorRetryRequest) {
      throw new AppError("Request not found", HTTP_STATUS.NOT_FOUND);
    }
    return doctorRetryRequest;
  }
}
