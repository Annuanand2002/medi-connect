import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import { IDoctorRetryTokenRepo } from "../../../domain/repositories/doctor/IDoctorRetry.repo";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { RetryDoctorRequestDTO } from "../../DTO/doctorRequet/retryDoctorRequest.update.DTO";
import { IDoctorRequestFileService } from "../../services/IDoctorRequestFileService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IRetryDoctorRequestUseCase } from "../../../domain/repositories/doctor/repo.usecase/IRetryDoctorRequest";

@injectable()
export class RetryDoctorRequestUseCase implements IRetryDoctorRequestUseCase {
  constructor(
    @inject(TYPES.DoctorRequestRepository)
    private _doctorReqRepo: IDoctorRequest,
    @inject(TYPES.DoctorRetryTokenRepository)
    private _doctorRetryRepo: IDoctorRetryTokenRepo,
    @inject(TYPES.DoctorRequestFileService)
    private _doctorRequestFileService: IDoctorRequestFileService,
  ) {}
  async execute(request: RetryDoctorRequestDTO): Promise<DoctorRequest> {
    const retryToken = await this._doctorRetryRepo.findByToken(request.token);
    if (!retryToken) {
      throw new AppError("Invalid token", HTTP_STATUS.BAD_REQUEST);
    }
    if (retryToken.expiresAt < new Date()) {
      throw new AppError("Token is expired", HTTP_STATUS.BAD_REQUEST);
    }
    const doctorRequest = await this._doctorReqRepo.findById(
      retryToken.doctorRequestId,
    );
    if (!doctorRequest) {
      throw new AppError("Request not found", HTTP_STATUS.NOT_FOUND);
    }
    const { profileImg, governmentId, medicalLicense, degreeCertificates } =
      await this._doctorRequestFileService.uploadFiles(request);
    const updated = await this._doctorReqRepo.update(doctorRequest.id!, {
      fullName: doctorRequest.fullName,
      email: doctorRequest.email,
      dateOfBirth: doctorRequest.dateOfBirth,
      qualification: doctorRequest.qualification,
      department: doctorRequest.department,
      experience: doctorRequest.experience,
      profileImg,
      governmentId,
      medicalLicense,
      degreeCertificates,
      status: "PENDING",
      rejectReason: undefined,
    });
    if (!updated) {
      throw new AppError("failed to update", HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
    await this._doctorRetryRepo.deleteByToken(request.token);
    return updated;
  }
}
