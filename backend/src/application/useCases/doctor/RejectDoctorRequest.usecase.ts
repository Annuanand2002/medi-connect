import env from "../../../shared/config/env";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import { IDoctorRetryTokenRepo } from "../../../domain/repositories/doctor/IDoctorRetry.repo";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { RejectDoctorRequestDTO } from "../../DTO/doctorRequet/rejectDoctorRequest.dto";
import IEmailService from "../../services/IEmailService";
import { IRejectDoctorRequestUseCase } from "../../repository/doctor/IRejectDoctorRequest.usecase";
import crypto from "crypto";

export class RejectdoctorRequestUseCase implements IRejectDoctorRequestUseCase {
  constructor(
    private doctorReqRepo: IDoctorRequest,
    private emailService: IEmailService,
    private doctorRetryRepo: IDoctorRetryTokenRepo,
  ) {}
  async execute(dto: RejectDoctorRequestDTO): Promise<void> {
    const doctorRequest = await this.doctorReqRepo.findById(
      dto.doctorRequestId,
    );
    if (!doctorRequest) {
      throw new AppError("Request not found", HTTP_STATUS.NOT_FOUND);
    }
    if (doctorRequest.status !== "PENDING") {
      throw new AppError(
        "Only pending doctor request can be rejected",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    const rejectCount = doctorRequest.rejectCount + 1;
    const canRetry = rejectCount <= 1;
    await this.doctorReqRepo.update(doctorRequest.id!, {
      status: "REJECTED",
      rejectReason: dto.rejectReason,
      rejectCount,
    });
    const token = crypto.randomUUID();
    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const retryLink = canRetry
      ? `${env.FRONTEND_URL}/doctor/retry?token=${token}`
      : "";
    await this.doctorRetryRepo.deleteBydoctorRequest(doctorRequest.id!);
    await this.doctorRetryRepo.create({
      doctorRequestId: doctorRequest.id!,
      token,
      expiresAt: expireAt,
    });
    await this.emailService.sendDoctorRejectionemail({
      name: doctorRequest.fullName,
      email: doctorRequest.email,
      rejectReason: dto.rejectReason,
      canRetry,
      retryLink,
    });
  }
}
