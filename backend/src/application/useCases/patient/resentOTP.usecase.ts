import { inject, injectable } from "inversify";
import { IResentOTPUseCase } from "../../../domain/repositories/patient/repo.usecase/IResendOTP.usecase";
import { TYPES } from "../../../di/types/types";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { IPatientOtpRepo } from "../../../domain/repositories/patient/IPatientOtp.repo";
import PATIENT_CONST from "../../../shared/constants/patient";
import { generateOtp } from "../../../shared/utils/generateOTP";
import IEmailService from "../../services/IEmailService";

@injectable()
export class ResentOTPUsecase implements IResentOTPUseCase {
  constructor(
    @inject(TYPES.PatientRepo)
    private _patientRepo: IPatientRepo,
    @inject(TYPES.PatientOTPRepo)
    private _otpService: IPatientOtpRepo,
    @inject(TYPES.EmailService)
    private _emailService: IEmailService,
  ) {}
  async execute(patientId: string): Promise<void> {
    const patient = await this._patientRepo.findById(patientId);
    if (!patient) {
      throw new AppError("Patient not found", HTTP_STATUS.NOT_FOUND);
    }
    if (patient.isVerified) {
      throw new AppError("Email is already verified", HTTP_STATUS.BAD_REQUEST);
    }
    const existingOTP = await this._otpService.findByPatientId(patientId);
    if (!existingOTP) {
      throw new AppError(
        "OTP request not found please register again",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    if (existingOTP.resendCount >= PATIENT_CONST.MAX_RESENDS) {
      throw new AppError(
        "Maximum OTP resend limit reached. Please register again.",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    const now = Date.now();
    const timeSinceLastSend = now - existingOTP.lastSentAt.getTime();
    if (timeSinceLastSend < PATIENT_CONST.RESEND_COOLDOWN) {
      const remainingTime = Math.ceil(
        (PATIENT_CONST.RESEND_COOLDOWN - timeSinceLastSend) / 1000,
      );
      throw new AppError(
        `Please wait ${remainingTime} seconds before requesting a new OTP.Your otp is still valid`,
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    const newOTp = generateOtp();
    const currentTime = new Date();
    await this._otpService.update(patientId, {
      otp: newOTp,
      expiresAt: new Date(currentTime.getTime() + PATIENT_CONST.OTP_EXPIRY),
      lastSentAt: currentTime,
      resendCount: existingOTP.resendCount + 1,
    });
    await this._emailService.sendPatientOtp({
      name: patient.fullName,
      email: patient.email,
      otp: newOTp,
    });
  }
}
