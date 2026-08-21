import { inject, injectable } from "inversify";
import { IDoctorRepo } from "../../../domain/repositories/doctor/IDoctor";
import { IDoctorResetTokenRepo } from "../../../domain/repositories/doctor/IDoctorResetToken.repo";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { IRequestForgetPassword } from "../../../domain/repositories/common/IRequestForgetPassword.usecase";
import IEmailService from "../../services/IEmailService";
import { TYPES } from "../../../di/types/types";

@injectable()
export class RequestDoctorForgetPasswordUseCase implements IRequestForgetPassword {
  constructor(
    @inject(TYPES.DoctorRepo)
    private _doctorRepo: IDoctorRepo,
    @inject(TYPES.DoctorResetTokenRepo)
    private _doctorResetTokenRepo: IDoctorResetTokenRepo,
    @inject(TYPES.EmailService)
    private _emailService: IEmailService,
  ) {}
  async execute(email: string): Promise<void> {
    const doctor = await this._doctorRepo.findByEmail(email);
    if (!doctor) {
      throw new AppError("Inavild email", HTTP_STATUS.UNAUTHORIZED);
    }
    await this._doctorResetTokenRepo.deleteByToken(doctor.id!);
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await this._doctorResetTokenRepo.create({
      doctorId: doctor.id!,
      token,
      expiresAt,
    });
    await this._emailService.sendDoctorResetEmail({
      name: doctor.fullName,
      email: doctor.email,
      token,
    });
  }
}
