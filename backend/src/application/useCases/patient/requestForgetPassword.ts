import { inject, injectable } from "inversify";
import { IRequestForgetPassword } from "../../../domain/repositories/common/IRequestForgetPassword.usecase";
import { TYPES } from "../../../di/types/types";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";
import { IPatientResetTokenRepo } from "../../../domain/repositories/patient/IResetToken.repo";
import IEmailService from "../../services/IEmailService";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class RequestPatientForgetPasswordUseCase implements IRequestForgetPassword {
  constructor(
    @inject(TYPES.PatientRepo)
    private _patientRepo: IPatientRepo,
    @inject(TYPES.PatientrResetTokenRepo)
    private _patientResetTokenRepo: IPatientResetTokenRepo,
    @inject(TYPES.EmailService)
    private _emailService: IEmailService,
  ) {}
  async execute(email: string): Promise<void> {
    const patient = await this._patientRepo.findByEmail(email);
    if (!patient) {
      throw new AppError("Inavild email", HTTP_STATUS.UNAUTHORIZED);
    }
    await this._patientResetTokenRepo.deleteByToken(patient.id!);
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await this._patientResetTokenRepo.create({
      patientId: patient.id!,
      token,
      expiresAt,
    });
    await this._emailService.sendPatientResetEmail({
      name: patient.fullName,
      email: patient.email,
      token,
    });
  }
}
