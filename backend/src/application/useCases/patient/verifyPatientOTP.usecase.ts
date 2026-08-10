import { inject, injectable } from "inversify";
import { IVerifyPatientOTPUsecase } from "../../repository/patient/IVerifyOTP.usecase";
import { IPatientOtpRepo } from "../../../domain/repositories/patient/IPatientOtp.repo";
import { VerifyPatientOtpDTO } from "../../DTO/patient/verifyOTP.dto";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { TYPES } from "../../../di/types/types";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";

@injectable()
export class VerifyPatientOTPUsecase implements IVerifyPatientOTPUsecase {
  constructor(
    @inject(TYPES.PatientOTPRepo)
    private _otpService: IPatientOtpRepo,
    @inject(TYPES.PatientRepo)
    private _patientRepo: IPatientRepo,
  ) {}
  async execute(dto: VerifyPatientOtpDTO): Promise<void> {
    const otpRecord = await this._otpService.findByPatientId(dto.patientId);
    if (!otpRecord) {
      throw new AppError(
        "OTP not found or already used",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    if (otpRecord.expiresAt < new Date()) {
      throw new AppError("otp is expired", HTTP_STATUS.BAD_REQUEST);
    }
    if (otpRecord.otp !== dto.otp) {
      throw new AppError("Invalid otp", HTTP_STATUS.BAD_REQUEST);
    }
    const patient = await this._patientRepo.findById(dto.patientId);
    if (!patient) {
      throw new AppError(
        "Patient not found.Please contact help center",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    await this._patientRepo.update(dto.patientId, { isVerified: true });
    await this._otpService.deleteByPatientId(dto.patientId);
  }
}
