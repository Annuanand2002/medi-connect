import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import { IDoctorRetryTokenRepo } from "../../../domain/repositories/doctor/IDoctorRetry.repo";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { RetryDoctorRequestDTO } from "../../DTO/doctorRequet/retryDoctorRequest.update.DTO";
import { IDoctorRequestFileService } from "../../services/IDoctorRequestFileService";
import { IRetryDoctorRequestUseCase } from "../../repository/doctor/IRetryDoctorRequest";

export class RetryDoctorRequestUseCase implements IRetryDoctorRequestUseCase {
  constructor(
    private doctorReqRepo: IDoctorRequest,
    private doctorRetryRepo: IDoctorRetryTokenRepo,
    private doctorRequestFileService: IDoctorRequestFileService,
  ) {}
  async execute(request: RetryDoctorRequestDTO): Promise<DoctorRequest> {
    const retryToken = await this.doctorRetryRepo.findByToken(request.token);
    if (!retryToken) {
      throw new AppError("Invalid token", HTTP_STATUS.BAD_REQUEST);
    }
    if (retryToken.expiresAt < new Date()) {
      throw new AppError("Token is expired", HTTP_STATUS.BAD_REQUEST);
    }
    const doctorRequest = await this.doctorReqRepo.findById(
      retryToken.doctorRequestId,
    );
    if (!doctorRequest) {
      throw new AppError("Request not found", HTTP_STATUS.NOT_FOUND);
    }
    const { profileImg, governmentId, medicalLicense, degreeCertificates } =
      await this.doctorRequestFileService.uploadFiles(request);
    const updated = await this.doctorReqRepo.update(doctorRequest.id!, {
      fullName: doctorRequest.fullName,
      email: doctorRequest.email,
      dateOfBirth: doctorRequest.dateOfBirth,
      qualification: doctorRequest.qualification,
      specialization: doctorRequest.specialization,
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
    await this.doctorRetryRepo.deleteByToken(request.token);
    return updated;
  }
}
